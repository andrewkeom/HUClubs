import DataProvider from "@/context/DataContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <DataProvider>
      <Stack />
    </DataProvider>
  );
}
