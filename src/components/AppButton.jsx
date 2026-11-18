import { Colors, Radius, Spacing, Typography } from "@/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

export default function AppButton(props) {
  return (
    <>
      <Pressable onPress={props.onPress} style={[styles.button, props.style]}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.small,
    borderRadius: Radius.default,
    alignItems: "center",
    minHeight: Spacing.minButtonHeight,
  },
  buttonText: {
    color: Colors.textOnPrimary,
    fontSize: Typography.body,
    fontWeight: Typography.weightMedium,
  },
});
