import Ionicons from "@react-native-vector-icons/ionicons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, Text, ToastAndroid, View } from "react-native";
import AppButton from "../../../components/AppButton";
import AppScreen from "../../../components/AppScreen";
import EmptyState from "../../../components/EmptyState";
import { Colors, Spacing, Typography } from "../../../constants/theme";
import { useAuth } from "../../../context/AuthContext";
import { useData } from "../../../context/DataContext";
import { findClubName } from "../../../lib/club";
import { formatEventDate } from "../../../lib/format";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const eventId = Number(id);
  const { events, deleteEvent } = useData();
  const { user } = useAuth();

  let content;
  const foundEvent = events.find((event) => {
    if (event.id === eventId) {
      return true;
    }
    return false;
  });

  function openEventForm() {
    router.push({ pathname: "/event-form", params: { id } });
  }

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
        {user.role === "officer" && user.clubId === foundEvent.clubId && (
          <View style={styles.viewRow}>
            <AppButton
              style={{ backgroundColor: Colors.danger }}
              onPress={() => {
                Alert.alert("Delete event", "This can't be undone", [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      try {
                        await deleteEvent(foundEvent.id);
                        ToastAndroid.show("Event deleted", ToastAndroid.SHORT);
                        router.back();
                      } catch (e) {
                        console.error(e);
                        Alert.alert("Error", "Couldn't delete the event.");
                      }
                    },
                  },
                ]);
              }}
              text="Delete event"
            />
            <AppButton
              onPress={() => {
                openEventForm();
              }}
              text="Edit event"
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <AppScreen>
      <Stack.Screen options={{ title: "Event details" }} />
      {content}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  view: {
    gap: Spacing.small,
  },
  viewRow: {
    flexDirection: "row",
    gap: Spacing.extraSmall,
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
