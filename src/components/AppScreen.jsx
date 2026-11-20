import { ScrollView, StyleSheet, View } from "react-native";
import { Colors, Spacing } from "../constants/theme";

export default function AppScreen(props) {
  const contentStyle = [styles.content, props.contentStyle];
  if (props.centered === true) {
    contentStyle.push(styles.centered);
  }
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={contentStyle}
          keyboardShouldPersistTaps="handled"
        >
          {props.children}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    padding: Spacing.small,
    paddingBottom: Spacing.extraLarge,
  },
  centered: {
    justifyContent: "center",
    padding: Spacing.medium,
  },
});
