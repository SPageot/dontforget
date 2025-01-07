import { StyleSheet, FlatList, Pressable, View } from "react-native";
import React, { useState } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import { Search } from "@/components/Search";
import ItemSelected from "@/components/ItemSelected";

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

  const onRemovePress = (text: string) => {
    setItemsSelectedList((prev) => prev.filter((item) => item !== text));
  };

  const renderItems = ({ item }: { item: string }): React.ReactElement => (
    <ItemSelected itemName={item} onRemovePress={() => onRemovePress(item)} />
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
      <Button
        textColor="#fff"
        buttonColor="red"
        style={{ width: "100%", borderRadius: "none", paddingVertical: 10 }}
      >
        Submit
      </Button>
    </View>
  );
};

export default DashboardScreen;
