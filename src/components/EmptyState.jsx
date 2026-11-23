import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../constants/theme";

export default function EmptyState(props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={Spacing.extraLarge}
        color={Colors.mutedText}
      />
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: Spacing.extraLarge,
    gap: Spacing.medium,
  },
  text: {
    textAlign: "center",
    color: Colors.mutedText,
    fontSize: Typography.body,
    fontweight: Typography.weightRegular,
  },
});
