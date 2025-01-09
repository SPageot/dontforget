import { ListActionType, ListStateType } from "@/types/types";

export const listReducer = (
  state: ListStateType,
  action: ListActionType
): ListStateType => {
  switch (action.type) {
    case "search":
      return {
        ...state,
        searchValue: action.payload,
      };
    case "isAddingPasskey":
      return {
        ...state,
        isAddingPasskey: action.payload,
      };
    case "passkey":
      return {
        ...state,
        passkey: action.payload,
      };
    case "isSearching":
      return {
        ...state,
        isSearchingForList: action.payload,
      };
    case "addToList":
      return {
        ...state,
        itemSelectedList: [...state.itemSelectedList, action.payload],
      };
    case "removeFromList":
      return {
        ...state,
        itemSelectedList: state.itemSelectedList.filter(
          (item) => item !== action.payload
        ),
      };
    case "addList":
      return {
        ...state,
        itemSelectedList: action.payload,
      };
    default:
      return state;
  }
};
