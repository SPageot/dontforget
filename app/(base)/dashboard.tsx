import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { Search } from "@/components/Search";

const DashboardScreen = () => {
  const theme = useTheme();
  const dashboardScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
  });
  return (
    <View style={dashboardScreenStyle.container}>
      <Search />
    </View>
  );
};

export default DashboardScreen;
