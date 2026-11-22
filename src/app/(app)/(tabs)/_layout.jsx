import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="events" options={{ title: "Events" }} />
      <Tabs.Screen name="clubs" options={{ title: "Clubs" }} />
    </Tabs>
  );
}
