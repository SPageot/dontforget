import { View, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { ScreenContainerType } from "@/types/types";

const ScreenContainer: React.FC<ScreenContainerType> = ({
  children,
}): React.ReactElement => {
  const theme = useTheme();
  const homeScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      gap: 30,
    },
  });
  return (
    <SafeAreaView style={homeScreenStyle.container}>{children}</SafeAreaView>
  );
};

export default ScreenContainer;
