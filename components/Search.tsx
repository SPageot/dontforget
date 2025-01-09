import { View, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const Search = ({
  onChangeText,
  value,
  onAddPress,
}: {
  onChangeText: (text: string) => void;
  value: string;
  onAddPress: () => void;
}) => {
  const textInputStyle = StyleSheet.create({
    container: {
      height: 40,
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
      {value && (
        <Ionicons onPress={onAddPress} name="add" size={40} color="green" />
      )}
    </View>
  );
};

export { Search };
