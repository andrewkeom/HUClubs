import { useData } from "@/context/DataContext";
import { ActivityIndicator, Text, View } from "react-native";

export default function HomeScreen() {
  const { events, memberships, registrations, isLoading } = useData();

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  return (
    <View>
      <Text>Events: {events.length}</Text>
      <Text>Memberships: {memberships.length}</Text>
      <Text>Registrations: {registrations.length}</Text>
    </View>
  );
}
