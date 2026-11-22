import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../constants/theme";
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
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primary}></ActivityIndicator>
      </View>
    );
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
