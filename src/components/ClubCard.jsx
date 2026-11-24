import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Radius, Spacing, Typography } from "../constants/theme";

export default function ClubCard(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.club.name}</Text>
      <View style={styles.category}>
        <Text style={styles.categoryText}>{props.club.category}</Text>
      </View>
      <Text style={styles.description}>{props.club.description}</Text>
      <View style={styles.locationRow}>
        <Ionicons
          name="location-outline"
          size={Spacing.iconSmall}
          color={Colors.accent}
        />
        <Text style={styles.location}>{props.club.meetingPlace}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: Radius.default,
    borderWidth: 1,
    padding: Spacing.small,
    gap: Spacing.extraSmall,
    marginBottom: Spacing.medium,
  },
  category: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.pill,
    alignSelf: "flex-start",
    padding: Spacing.extraSmall,
  },
  categoryText: {
    color: Colors.primary,
    fontSize: Typography.small,
    fontWeight: Typography.weightMedium,
  },
  description: {
    color: Colors.text,
    fontWeight: Typography.weightRegular,
    fontSize: Typography.body,
  },
  location: {
    color: Colors.text,
    fontSize: Typography.body,
    fontWeight: Typography.weightRegular,
  },
  locationRow: {
    flexDirection: "row",
    gap: Spacing.iconSpacing,
    alignItems: "center",
  },
  title: {
    fontSize: Typography.heading2,
    fontWeight: Typography.weightStrong,
    color: Colors.text,
  },
});
