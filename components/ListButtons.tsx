import React from "react";
import ListOptionsButton from "./ListOptionsButton";
import { ListButtonsType } from "@/types/types";

const ListButtons: React.FC<ListButtonsType> = ({
  state,
  isLookUpSuccess,
  isUpdatePending,
  isLookUpPending,
  onListLookUpPress,
  onUpdateListPress,
  onAddingPassKeyPress,
}) => {
  if (state.itemSelectedList.length > 0 && !state.isAddingPasskey) {
    return (
      <ListOptionsButton
        buttonLabel={isLookUpSuccess ? "Update List" : "Add Passkey To Share"}
        onPress={isLookUpSuccess ? onUpdateListPress : onAddingPassKeyPress}
        isLoading={isUpdatePending}
      />
    );
  } else {
    return (
      <ListOptionsButton
        buttonLabel="List Lookup"
        onPress={onListLookUpPress}
        isLoading={isLookUpPending}
      />
    );
  }
};

export default ListButtons;
