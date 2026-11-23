import { Stack } from "expo-router";
import LoadingView from "../components/LoadingView";
import AuthProvider, { useAuth } from "../context/AuthContext";
import DataProvider from "../context/DataContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <DataProvider>
        <RootNavigator />
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
      <Stack.Screen name="index" />
      <Stack.Protected guard={user === null}>
        <Stack.Screen name="login" />
      </Stack.Protected>
      <Stack.Protected guard={user !== null}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
