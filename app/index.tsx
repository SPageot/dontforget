import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { Text } from "react-native-paper";

export default function HomeScreen() {
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
    <View style={homeScreenStyle.container}>
      <Text style={{ fontWeight: "900", color: "#fff" }} variant="displayLarge">
        Dont Forget
      </Text>
      <Link
        style={{
          paddingHorizontal: 30,
          paddingVertical: 10,
          backgroundColor: "red",
          color: "#fff",
          borderRadius: 20,
        }}
        href="/dashboard"
      >
        Start
      </Link>
    </View>
  );
}
