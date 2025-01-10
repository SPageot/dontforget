import { Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NotificationType } from "@/types/types";

const Notification: React.FC<NotificationType> = ({
  listError,
  isUpdateSuccess,
  isCreateSuccess,
  isLookupSuccess,
  onClearPress,
}) => {
  return (
    <Pressable
      onPress={onClearPress}
      style={{
        position: "absolute",
        top: 70,
        left: 0,
        width: "100%",
        backgroundColor: listError ? "red" : "green",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        flexDirection: "row",
        zIndex: 10000,
      }}
    >
      <Text style={{ color: "#fff" }}>
        {listError && listError.message}
        {isUpdateSuccess && "Successfully Updated List"}
        {isLookupSuccess && "List Found!"}
        {isCreateSuccess && "List Successfully Shared!"}
      </Text>
      {listError ? (
        <Ionicons name="close-circle" color="#fff" size={20} />
      ) : (
        <Ionicons name="checkmark-circle" color="#fff" size={20} />
      )}
      <Text style={{ fontSize: 10, color: "#fff" }}>Press To Clear</Text>
    </Pressable>
  );
};

export default Notification;
