import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../../constants/theme";
import { useAuth } from "../../../context/AuthContext";

export default function TabsLayout() {
  const { logout } = useAuth();
  return (
    <Tabs
      screenOptions={{
        headerTintColor: Colors.primary,
        tabBarActiveTintColor: Colors.primary,
        headerRight: () => {
          return (
            <Pressable
              onPress={logout}
              accessibilityLabel="Log out"
              style={styles.logoutButton}
            >
              <Ionicons
                name="log-out-outline"
                size={Spacing.icon}
                color={Colors.primary}
              />
            </Pressable>
          );
        },
      }}
    >
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="calendar-outline" size={size} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="clubs"
        options={{
          title: "Clubs",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="people-circle-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    paddingHorizontal: Spacing.small,
    minHeight: Spacing.minButtonHeight,
    justifyContent: "center",
  },
});
