import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useReducer } from "react";
import { useTheme, Portal, Modal } from "react-native-paper";
import { Search } from "@/components/Search";
import ItemSelected from "@/components/ItemSelected";
import { useMutation } from "@tanstack/react-query";
import { ListStateType } from "@/types/types";
import { listReducer } from "@/reducers/listReducer";
import { addList, getList, updateList } from "@/api/mutations/listMutations";
import { useToast } from "expo-toast";
import EmptyList from "@/components/EmptyList";

import ListLookUpModal from "@/components/ListLookUpModal";
import ListButtons from "@/components/ListButtons";
import { AxiosError } from "axios";

const listState: ListStateType = {
  searchValue: "",
  isAddingPasskey: false,
  isSearchingForList: false,
  passkey: "",
  itemSelectedList: [],
};

const ListScreen = () => {
  const theme = useTheme();
  const toast = useToast();

  const [state, dispatch] = useReducer(listReducer, listState);
  const {
    mutate: listLookupMutate,
    data: listLookUpData,
    isSuccess: isLookUpSuccess,
    isPending: isLookUpPending,
    isError: isLookupError,
    reset: lookUpReset,
  } = useMutation({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.data.detail) {
            toast.show(error.response.data.detail, {
              duration: 5000,
            });
          } else {
            toast.show(error.response.data.error, {
              duration: 5000,
            });
          }
        } else {
          toast.show(error.message, {
            duration: 5000,
          });
        }
      }
    },
    mutationFn: getList,
  });
  const {
    mutate: createListMutate,
    isSuccess: isCreateListSuccess,
    isError: isCreateError,
    isPending: isCreateListPending,
    reset: createReset,
  } = useMutation({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.data.detail) {
            toast.show(error.response.data.detail, {
              duration: 5000,
            });
          } else {
            toast.show(error.response.data.error, {
              duration: 5000,
            });
          }
        } else {
          toast.show(error.message, {
            duration: 5000,
          });
        }
      }
    },
    mutationFn: addList,
  });
  const {
    data: updatedList,
    mutate: updateListMutate,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
    reset: updateReset,
  } = useMutation({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.data.detail) {
            toast.show(error.response.data.detail, {
              duration: 5000,
            });
          } else {
            toast.show(error.response.data.error, {
              duration: 5000,
            });
          }
        } else {
          toast.show(error.message, {
            duration: 5000,
          });
        }
      }
    },
    mutationFn: updateList,
  });

  useEffect(() => {
    if (isLookUpSuccess) {
      updateReset();
      createReset();
      toast.show("List Found!!!", {
        duration: 5000,
      });
      dispatch({ type: "addList", payload: listLookUpData.list });
      dispatch({ type: "isSearching", payload: false });
      return;
    }
  }, [isLookUpSuccess, isLookupError]);

  useEffect(() => {
    if (isUpdateSuccess) {
      createReset();
      lookUpReset();
      toast.show("List Successfully Updated!", {
        duration: 5000,
      });
      dispatch({ type: "addList", payload: updatedList });
      dispatch({ type: "isAddingPasskey", payload: false });
      dispatch({ type: "passkey", payload: "" });
      return;
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isCreateListSuccess) {
      lookUpReset();
      updateReset();
      toast.show("List Successfully Shareable!", {
        duration: 5000,
      });
      dispatch({ type: "addList", payload: [] });
      dispatch({ type: "isAddingPasskey", payload: false });
      dispatch({ type: "passkey", payload: "" });
      return;
    }

    if (isCreateError) {
      toast.show("Error Creating List", {
        duration: 5000,
      });
    }
  }, [isCreateListSuccess, isCreateError]);

  const dashboardScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      position: "relative",
    },
  });

  const onSearchChangeText = (text: string) => {
    dispatch({ type: "search", payload: text });
  };
  const onPressSubmit = () => {
    dispatch({ type: "addToList", payload: state.searchValue });
    dispatch({ type: "search", payload: "" });
  };

  const renderItems = ({ item }: { item: string }): React.ReactElement => (
    <ItemSelected itemName={item} onRemovePress={() => onRemovePress(item)} />
  );

  const onAddingPassKeyPress = () => {
    dispatch({ type: "isAddingPasskey", payload: true });
  };

  const onRemovePress = (text: string) => {
    dispatch({ type: "removeFromList", payload: text });
  };

  const onSubmitPress = () => {
    createListMutate(state);
  };

  const onListLookUpPress = () => {
    if (!state.isSearchingForList) {
      dispatch({ type: "isSearching", payload: true });
      return;
    }
    listLookupMutate(state.passkey);
  };

  const onUpdateListPress = () => {
    updateListMutate(state);
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
        <EmptyList message="Add Items to the list" />
      )}
      <ListButtons
        onUpdateListPress={onUpdateListPress}
        onListLookUpPress={onListLookUpPress}
        state={state}
        isLookUpSuccess={isLookUpSuccess}
        isLookUpPending={isLookUpPending}
        isUpdatePending={isUpdatePending}
        onAddingPassKeyPress={onAddingPassKeyPress}
      />

      {(state.isAddingPasskey || state.isSearchingForList) && (
        <Portal>
          <Modal
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            visible={state.isAddingPasskey || state.isSearchingForList}
          >
            <ListLookUpModal
              state={state}
              onChangeText={(text: string) =>
                dispatch({ type: "passkey", payload: text })
              }
              isLookUpPending={isLookUpPending}
              onOptionsPress={
                state.isSearchingForList ? onListLookUpPress : onSubmitPress
              }
              onCancelPress={() => {
                if (state.isAddingPasskey) {
                  dispatch({ type: "isAddingPasskey", payload: false });
                }

                if (state.isSearchingForList) {
                  dispatch({ type: "isSearching", payload: false });
                }
              }}
              isCreateListPending={isCreateListPending}
            />
          </Modal>
        </Portal>
      )}
    </SafeAreaView>
  );
};

export default ListScreen;
