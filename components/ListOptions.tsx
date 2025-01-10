import React from "react";
import { Button } from "react-native-paper";
import ListOptionsButton from "./ListOptionsButton";
import { ListOptionsType } from "@/types/types";

const ListOptions: React.FC<ListOptionsType> = ({
  isListEmptyCondition,
  onListLookUpPress,
  onAddingPassKeyPress,
  state,
  isLookUpSuccess,
  isUpdatePending,
  onUpdateListPress,
}) => {
  if (isListEmptyCondition && !state.isAddingPasskey) {
    return (
      <ListOptionsButton
        onPress={isLookUpSuccess ? onUpdateListPress : onAddingPassKeyPress}
        buttonLabel={isLookUpSuccess ? "Update List" : "Add Passkey To Share"}
        isLoading={isUpdatePending}
      />
    );
  } else {
    return (
      <Button
        textColor="#fff"
        buttonColor="red"
        style={{ width: "100%", borderRadius: "none", paddingVertical: 10 }}
        onPress={onListLookUpPress}
      >
        List Lookup
      </Button>
    );
  }
};

export default ListOptions;
