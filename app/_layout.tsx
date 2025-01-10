import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "expo-toast";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1A2421",
    secondary: "yellow",
  },
};

export default function RootLayout() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(base)" />
            <Stack.Screen name="index" />
          </Stack>
        </PaperProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}
