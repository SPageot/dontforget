import ScreenContainer from "@/components/ScreenContainer";
import { Link } from "expo-router";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  return (
    <ScreenContainer>
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
        href="/list"
      >
        Start
      </Link>
    </ScreenContainer>
  );
}
