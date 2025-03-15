import { Stack } from "expo-router";
import "./globals.css";
import { UserProvider } from "@/services/AuthContext";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      </UserProvider>
  );
}