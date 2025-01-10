import React from "react";

export type ListStateType = {
  searchValue: string;
  isAddingPasskey: boolean;
  isSearchingForList: boolean;
  passkey: string;
  itemSelectedList: [] | string[];
};

export type NotificationType = {
  listError?: any;
  isLookupSuccess?: boolean;
  isUpdateSuccess?: boolean;
  isCreateSuccess?: boolean;
  onClearPress?: () => void;
};

export type ListButtonsType = {
  state: ListStateType;
  isLookUpSuccess: boolean;
  isUpdatePending: boolean;
  isLookUpPending: boolean;
  onListLookUpPress: () => void;
  onUpdateListPress: () => void;
  onAddingPassKeyPress: () => void;
};

export type ListLookUpModalType = {
  state: ListStateType;
  onChangeText: (text: string) => void;
  isLookUpPending: boolean;
  onOptionsPress: () => void;
  onCancelPress: () => void;
  isCreateListPending: boolean;
};

export type ListOptionsType = {
  isListEmptyCondition: boolean;
  onListLookUpPress: () => void;
  onAddingPassKeyPress: () => void;
  state: ListStateType;
  isLookUpSuccess: boolean;
  isUpdatePending: boolean;
  onUpdateListPress: () => void;
};

export type ListActionType =
  | { type: "isAddingPasskey"; payload: boolean }
  | { type: "isSearching"; payload: boolean }
  | { type: "passkey"; payload: string }
  | { type: "search"; payload: string }
  | { type: "addToList"; payload: string }
  | { type: "removeFromList"; payload: string }
  | { type: "addList"; payload: string[] | [] };

export type SourceType = {
  id: number | null;
  name: string;
};

export type NewsType = {
  source: SourceType;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type ScreenContainerType = {
  children: React.ReactNode;
};
