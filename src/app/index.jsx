import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import { Colors, Spacing, Typography } from "../constants/theme";

export default function WelcomeScreen() {
  function openLogin(role) {
    router.push({ pathname: "/login", params: { role } });
  }
  return (
    <AppScreen centered>
      <View style={styles.titleView}>
        <Text style={styles.title}>HU Clubs</Text>
        <Text style={styles.description}>
          Browse Haigazian clubs and events
        </Text>
      </View>
      <View style={styles.buttonView}>
        <AppButton
          text="I'm a Student"
          onPress={() => {
            openLogin("student");
          }}
        />
        <AppButton
          text="I'm a Club Officer"
          onPress={() => {
            openLogin("officer");
          }}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    gap: Spacing.small,
    paddingHorizontal: Spacing.extraLarge,
  },
  description: {
    fontSize: Typography.body,
    fontWeight: Typography.weightRegular,
    color: Colors.mutedText,
  },
  title: {
    fontSize: Typography.title,
    fontWeight: Typography.weightStrong,
    color: Colors.primary,
  },
  titleView: {
    gap: Spacing.extraSmall,
    marginBottom: Spacing.large,
    alignItems: "center",
  },
});
