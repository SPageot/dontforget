import { StyleSheet, FlatList, View, SafeAreaView } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import {
  useTheme,
  Text,
  Button,
  ActivityIndicator,
  Portal,
  Modal,
  TextInput,
} from "react-native-paper";
import { Search } from "@/components/Search";
import ItemSelected from "@/components/ItemSelected";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "@/util/constants";
import { ListStateType } from "@/types/types";
import { listReducer } from "@/reducers/listReducer";

const listState: ListStateType = {
  searchValue: "",
  isAddingPasskey: false,
  isSearchingForList: false,
  passkey: "",
  itemSelectedList: [],
};

const ListScreen = () => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(listReducer, listState);
  const {
    mutate: listLookupMutate,
    data: listLookUpData,
    isSuccess: isLookUpSuccess,
  } = useMutation({
    mutationFn: async (passkey: string) => {
      const response = await axios.post(`${BASE_API_URL}/get-list`, {
        passkey,
      });
      const data = await response;
      return data.data;
    },
  });
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: async (itemsSelected: string[]) => {
      const response = await axios.post(`${BASE_API_URL}/list`, {
        passkey: state.passkey,
        list: itemsSelected,
      });
      const data = await response;
      return data.data;
    },
  });
  const {
    mutate: updateListMutate,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
  } = useMutation({
    mutationFn: async (itemsSelected: string[]) => {
      const response = await axios.put(`${BASE_API_URL}/update-list`, {
        passkey: state.passkey,
        list: itemsSelected,
      });
      const data = await response;
      return data.data;
    },
  });

  const dashboardScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
  });

  const onSearchChangeText = (text: string) => {
    dispatch({ type: "search", payload: text });
  };
  const onPressSubmit = () => {
    dispatch({ type: "addToList", payload: state.searchValue });
    dispatch({ type: "search", payload: "" });
  };

  const onRemovePress = (text: string) => {
    dispatch({ type: "removeFromList", payload: text });
  };

  const renderItems = ({ item }: { item: string }): React.ReactElement => (
    <ItemSelected itemName={item} onRemovePress={() => onRemovePress(item)} />
  );

  const onSubmitPress = () => {
    mutate(state.itemSelectedList);
  };

  useEffect(() => {
    if (isLookUpSuccess) {
      dispatch({ type: "addList", payload: listLookUpData.list });
      dispatch({ type: "isSearching", payload: false });
    }
  }, [isLookUpSuccess]);

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "addList", payload: [] });
      dispatch({ type: "isAddingPasskey", payload: false });
      dispatch({ type: "passkey", payload: "" });
    }
  }, [isSuccess]);

  const onAddingPassKeyPress = () => {
    dispatch({ type: "isAddingPasskey", payload: true });
  };

  const textInputStyle = StyleSheet.create({
    container: {
      width: "95%",
    },
  });

  const onListLookUpPress = () => {
    if (!state.isSearchingForList) {
      dispatch({ type: "isSearching", payload: true });
      return;
    }
    listLookupMutate(state.passkey);
  };

  const onUpdateListPress = () => {
    updateListMutate(state.itemSelectedList);
  };
  return (
    <SafeAreaView style={dashboardScreenStyle.container}>
      <Search
        onAddPress={onPressSubmit}
        onChangeText={onSearchChangeText}
        value={state.searchValue}
      />
      {state.itemSelectedList.length > 0 ? (
        <FlatList
          data={state.itemSelectedList}
          renderItem={renderItems}
          keyExtractor={(text) => text}
          contentContainerStyle={{ gap: 10 }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="bodyMedium" style={{ color: "#fff", fontWeight: 800 }}>
            Add Items to the list
          </Text>
        </View>
      )}
      {state.itemSelectedList.length > 0 && !state.isAddingPasskey ? (
        <Button
          textColor="#fff"
          buttonColor={isUpdateSuccess ? "green" : "red"}
          style={{ width: "100%", borderRadius: "none", paddingVertical: 10 }}
          onPress={isLookUpSuccess ? onUpdateListPress : onAddingPassKeyPress}
        >
          {isLookUpSuccess ? "Update List" : "Add Passkey To Share"}
          {isUpdatePending && <ActivityIndicator size={20} color="#fffo" />}
        </Button>
      ) : (
        <Button
          textColor="#fff"
          buttonColor="red"
          style={{ width: "100%", borderRadius: "none", paddingVertical: 10 }}
          onPress={onListLookUpPress}
        >
          List Lookup
        </Button>
      )}

      {(state.isAddingPasskey || state.isSearchingForList) && (
        <Portal>
          <Modal
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            visible={state.isAddingPasskey || state.isSearchingForList}
            onDismiss={() => {
              if (state.isAddingPasskey) {
                dispatch({ type: "isAddingPasskey", payload: false });
              }

              if (state.isSearchingForList) {
                dispatch({ type: "isSearching", payload: false });
              }
            }}
          >
            <View
              style={{
                height: "100%",
                justifyContent: "center",
                gap: 30,
                alignItems: "center",
              }}
            >
              <TextInput
                value={state.passkey}
                onChangeText={(text: string) =>
                  dispatch({ type: "passkey", payload: text })
                }
                style={textInputStyle.container}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {isPending ? (
                  <ActivityIndicator size={20} color="#fff" />
                ) : (
                  <>
                    <Button
                      textColor="#fff"
                      buttonColor="red"
                      style={{
                        width: "40%",
                        borderRadius: "none",
                        paddingVertical: 10,
                      }}
                      onPress={
                        state.isSearchingForList
                          ? onListLookUpPress
                          : onSubmitPress
                      }
                    >
                      Submit List
                    </Button>
                    <Button
                      textColor="#fff"
                      buttonColor="red"
                      style={{
                        width: "40%",
                        borderRadius: "none",
                        paddingVertical: 10,
                      }}
                      onPress={() => {
                        if (state.isAddingPasskey) {
                          dispatch({ type: "isAddingPasskey", payload: false });
                        }

                        if (state.isSearchingForList) {
                          dispatch({ type: "isSearching", payload: false });
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </Portal>
      )}
    </SafeAreaView>
  );
};

export default ListScreen;
