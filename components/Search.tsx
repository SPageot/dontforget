import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const Search = ({
  onChangeText,
  value,
}: {
  onChangeText: () => void;
  value: string;
}) => {
  const textInputStyle = StyleSheet.create({
    container: {
      height: 30,
      width: "75%",
    },
  });
  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "row",
        margin: 10,
        gap: 10,
      }}
    >
      <TextInput
        onChangeText={onChangeText}
        value={value}
        mode="outlined"
        style={textInputStyle.container}
      />
      <Ionicons name="add" size={40} color="green" />
    </View>
  );
};

export { Search };
