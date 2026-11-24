import Ionicons from "@react-native-vector-icons/ionicons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppScreen from "../../../components/AppScreen";
import EmptyState from "../../../components/EmptyState";
import { Colors, Spacing, Typography } from "../../../constants/theme";
import { useData } from "../../../context/DataContext";
import { findClubName } from "../../../lib/club";
import { formatEventDate } from "../../../lib/format";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const eventId = Number(id);
  const { events } = useData();

  let content;
  const foundEvent = events.find((event) => {
    if (event.id === eventId) {
      return true;
    }
    return false;
  });

  if (!foundEvent) {
    content = (
      <EmptyState
        onPress={() => {
          router.back();
        }}
        buttonText="Back to events"
        message="Event not found"
      />
    );
  } else {
    content = (
      <View style={styles.view}>
        <Text style={styles.title}>{foundEvent.title}</Text>
        <Text style={styles.clubName}>{findClubName(foundEvent.clubId)}</Text>
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-number-outline"
            size={Spacing.iconSmall}
            color={Colors.accent}
          />
          <Text style={styles.dateLocation}>
            {formatEventDate(foundEvent.date)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={Spacing.iconSmall}
            color={Colors.accent}
          />
          <Text style={styles.dateLocation}>{foundEvent.location}</Text>
        </View>
        <Text style={styles.description}>{foundEvent.description}</Text>
      </View>
    );
  }
  return (
    <AppScreen>
      <Stack.Screen options={{ title: "Event Details" }} />
      {content}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  view: {
    gap: Spacing.medium,
  },
  title: {
    fontSize: Typography.title,
    fontWeight: Typography.weightStrong,
    color: Colors.text,
  },
  clubName: {
    fontSize: Typography.heading2,
    fontWeight: Typography.weightMedium,
    color: Colors.primary,
  },
  dateLocation: {
    fontSize: Typography.body,
    fontWeight: Typography.weightRegular,
    color: Colors.mutedText,
  },
  description: {
    fontSize: Typography.body,
    fontWeight: Typography.weightRegular,
    color: Colors.text,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.iconSpacing,
  },
});
