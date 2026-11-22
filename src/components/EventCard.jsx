import Ionicons from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Radius, Spacing, Typography } from "../constants/theme";
import { formatEventDate } from "../lib/format";

export default function EventCard(props) {
  return (
    <Pressable
      onPress={() => {
        props.onPress();
      }}
      style={styles.card}
    >
      <Text style={styles.title}>{props.event.title}</Text>
      <Text style={styles.clubName}>{props.clubName}</Text>
      <View style={styles.infoRow}>
        <Ionicons
          name="calendar-number-outline"
          size={Spacing.iconSmall}
          color={Colors.accent}
        />
        <Text style={styles.dateLocation}>
          {formatEventDate(props.event.date)}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons
          name="location-outline"
          size={Spacing.iconSmall}
          color={Colors.accent}
        />
        <Text style={styles.dateLocation}>{props.event.location}</Text>
      </View>
    </Pressable>
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
  clubName: {
    color: Colors.primary,
    fontWeight: Typography.weightMedium,
  },
  title: {
    fontSize: Typography.heading2,
    fontWeight: Typography.weightStrong,
    color: Colors.text,
  },
  infoRow: {
    flexDirection: "row",
    gap: Spacing.iconSpacing,
    alignItems: "center",
  },
  dateLocation: {
    fontSize: Typography.body,
    color: Colors.mutedText,
    flexShrink: 1,
  },
});
