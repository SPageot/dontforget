import { View, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import { Search } from "@/components/Search";

const DashboardScreen = () => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");
  const [itemsSelectedList, setItemsSelectedList] = useState<string[] | []>([]);
  const dashboardScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
  });

  const onSearchChangeText = (text: string) => setSearchValue(text);
  const onPressSubmit = () => {
    setItemsSelectedList((prev) => [...prev, searchValue]);
    setSearchValue("");
  };

  const renderItems = ({ item }: { item: string }): React.ReactElement => (
    <View style={{ backgroundColor: "#5dbb63", padding: 20 }}>
      <Text variant="titleLarge" style={{ color: "#fff", fontWeight: "800" }}>
        {item}
      </Text>
    </View>
  );
  return (
    <View style={dashboardScreenStyle.container}>
      <Search
        onAddPress={onPressSubmit}
        onChangeText={onSearchChangeText}
        value={searchValue}
      />
      <FlatList
        data={itemsSelectedList}
        renderItem={renderItems}
        keyExtractor={(text) => text}
        contentContainerStyle={{ gap: 10 }}
      />
      <Button textColor="#fff" buttonColor="red" style={{ width: "30%" }}>
        Submit
      </Button>
    </View>
  );
};

export default DashboardScreen;
