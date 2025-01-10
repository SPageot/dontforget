import { ListStateType } from "@/types/types";
import { BASE_API_URL } from "@/util/constants";
import axios from "axios";

export const getList = async (passkey: string) => {
  const response = await axios.post(`${BASE_API_URL}/get-list`, {
    passkey,
  });
  const data = await response;
  return data.data;
};

export const addList = async (state: ListStateType) => {
  const response = await axios.post(`${BASE_API_URL}/list`, {
    passkey: state.passkey,
    list: state.itemSelectedList,
  });
  const data = await response;
  return data.data;
};

export const updateList = async (state: ListStateType) => {
  const response = await axios.put(`${BASE_API_URL}/update-list`, {
    passkey: state.passkey,
    list: state.itemSelectedList,
  });
  const data = await response;
  return data.data;
};
