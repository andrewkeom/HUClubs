import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import LoadingView from "../components/LoadingView";
import AuthProvider, { useAuth } from "../context/AuthContext";
import DataProvider from "../context/DataContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <DataProvider>
        <RootNavigator />
        <StatusBar style="dark" />
      </DataProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <LoadingView />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Protected guard={user === null}>
        <Stack.Screen name="login" options={{ title: "Log in" }} />
      </Stack.Protected>
      <Stack.Protected guard={user !== null}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
