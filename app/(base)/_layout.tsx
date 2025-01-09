import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function BaseLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color }) => (
            <Ionicons name="newspaper" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
