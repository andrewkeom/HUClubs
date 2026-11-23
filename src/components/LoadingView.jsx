import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../constants/theme";

export default function LoadingView() {
  return (
    <View style={styles.centered}>
      <ActivityIndicator color={Colors.primary} />
    </View>
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
