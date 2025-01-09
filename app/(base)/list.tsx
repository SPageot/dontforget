import { StyleSheet, FlatList, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
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

const ListScreen = () => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isAddingPasskey, setIsAddingPasskey] = useState<boolean>(false);
  const [isSearchingForList, setIsSearchingForList] = useState(false);
  const [passkey, setPasskey] = useState<string>("");
  const [itemsSelectedList, setItemsSelectedList] = useState<string[] | []>([]);
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
        passkey,
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
        passkey,
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

  const onSearchChangeText = (text: string) => setSearchValue(text);
  const onPressSubmit = () => {
    setItemsSelectedList((prev) => [...prev, searchValue]);
    setSearchValue("");
  };

  const onRemovePress = (text: string) => {
    setItemsSelectedList((prev) => prev.filter((item) => item !== text));
  };

  const renderItems = ({ item }: { item: string }): React.ReactElement => (
    <ItemSelected itemName={item} onRemovePress={() => onRemovePress(item)} />
  );

  const onSubmitPress = () => {
    mutate(itemsSelectedList);
  };

  useEffect(() => {
    if (isLookUpSuccess) {
      setItemsSelectedList(listLookUpData.list);
      setIsSearchingForList(false);
    }
  }, [isLookUpSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setItemsSelectedList([]);
      setIsAddingPasskey(false);
      setPasskey("");
    }
  }, [isSuccess]);

  const onAddingPassKeyPress = () => {
    setIsAddingPasskey(true);
  };

  const textInputStyle = StyleSheet.create({
    container: {
      width: "95%",
    },
  });

  const onListLookUpPress = () => {
    if (!isSearchingForList) {
      setIsSearchingForList(true);
      return;
    }
    listLookupMutate(passkey);
  };

  const onUpdateListPress = () => {
    updateListMutate(itemsSelectedList);
  };
  return (
    <SafeAreaView style={dashboardScreenStyle.container}>
      <Search
        onAddPress={onPressSubmit}
        onChangeText={onSearchChangeText}
        value={searchValue}
      />
      {itemsSelectedList.length > 0 ? (
        <FlatList
          data={itemsSelectedList}
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
      {itemsSelectedList.length > 0 && !isAddingPasskey ? (
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

      {(isAddingPasskey || isSearchingForList) && (
        <Portal>
          <Modal
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            visible={isAddingPasskey || isSearchingForList}
            onDismiss={() => {
              if (isAddingPasskey) {
                setIsAddingPasskey(false);
              }

              if (isSearchingForList) {
                setIsSearchingForList(false);
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
                value={passkey}
                onChangeText={(text: string) => setPasskey(text)}
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
                        isSearchingForList ? onListLookUpPress : onSubmitPress
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
                        if (isAddingPasskey) {
                          setIsAddingPasskey(false);
                        }

                        if (isSearchingForList) {
                          setIsSearchingForList(false);
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
