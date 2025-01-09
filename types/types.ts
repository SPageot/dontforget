export type ListStateType = {
  searchValue: string;
  isAddingPasskey: boolean;
  isSearchingForList: boolean;
  passkey: string;
  itemSelectedList: [] | string[];
};

export type ListActionType =
  | { type: "isAddingPasskey"; payload: boolean }
  | { type: "isSearching"; payload: boolean }
  | { type: "passkey"; payload: string }
  | { type: "search"; payload: string }
  | { type: "addToList"; payload: string }
  | { type: "removeFromList"; payload: string }
  | { type: "addList"; payload: string[] | [] };
