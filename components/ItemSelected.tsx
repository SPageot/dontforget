import { Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

const ItemSelected = ({
  onRemovePress,
  itemName,
}: {
  onRemovePress: () => void;
  itemName: string;
}) => {
  const [isItemTaken, setIsItemTaken] = useState(false);
  return (
    <Pressable
      onLongPress={() => setIsItemTaken(true)}
      style={{
        backgroundColor: "#5dbb63",
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text variant="titleLarge" style={{ color: "#fff", fontWeight: "800" }}>
        {itemName}
      </Text>
      {isItemTaken ? (
        <Ionicons name="checkmark-circle" size={20} color="green" />
      ) : (
        <Ionicons onPress={onRemovePress} name="remove" size={20} color="red" />
      )}
    </Pressable>
  );
};

export default ItemSelected;
