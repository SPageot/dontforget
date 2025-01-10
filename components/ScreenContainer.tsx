import { View, StyleSheet } from "react-native";
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
  return <View style={homeScreenStyle.container}>{children}</View>;
};

export default ScreenContainer;
