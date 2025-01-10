import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";

const EmptyList = ({ message }: { message: string }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="bodyMedium" style={{ color: "#fff", fontWeight: 800 }}>
        {message}
      </Text>
    </View>
  );
};

export default EmptyList;
