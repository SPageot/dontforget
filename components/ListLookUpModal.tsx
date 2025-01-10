import { View, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import ListOptionsButton from "./ListOptionsButton";
import { ListLookUpModalType } from "@/types/types";

const ListLookUpModal: React.FC<ListLookUpModalType> = ({
  state,
  onChangeText,
  isLookUpPending,
  onOptionsPress,
  onCancelPress,
  isCreateListPending,
}) => {
  const textInputStyle = StyleSheet.create({
    container: {
      width: "95%",
    },
  });
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        gap: 30,
        alignItems: "center",
      }}
    >
      <TextInput
        autoFocus
        value={state.passkey}
        onChangeText={onChangeText}
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
        <ListOptionsButton
          reduceSize
          buttonLabel={state.isSearchingForList ? "Lookup List" : "Submit List"}
          onPress={onOptionsPress}
          isLoading={isLookUpPending || isCreateListPending}
        />
        <ListOptionsButton
          reduceSize
          buttonLabel={"Cancel"}
          onPress={onCancelPress}
        />
      </View>
    </View>
  );
};

export default ListLookUpModal;
