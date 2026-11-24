import DateTimePicker from "@expo/ui/community/datetime-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, ToastAndroid, View } from "react-native";
import * as z from "zod";
import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import AppTextInput from "../../components/AppTextInput";
import { Colors, Spacing } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { formatEventDate } from "../../lib/format";

export default function EventForm() {
  const { id } = useLocalSearchParams();
  const { events, addEvent, updateEvent } = useData();
  const editingEvent = events.find((event) => {
    if (event.id === Number(id)) {
      return true;
    }
    return false;
  });

  const [title, setTitle] = useState(editingEvent ? editingEvent.title : "");
  const [description, setDescription] = useState(
    editingEvent ? editingEvent.description : "",
  );
  const [location, setLocation] = useState(
    editingEvent ? editingEvent.location : "",
  );
  const [error, setError] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [date, setDate] = useState(
    editingEvent ? new Date(editingEvent.date) : tomorrow,
  );

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const { user } = useAuth();

  const eventSchema = z.object({
    title: z.string().trim().min(3, "Use at least 3 characters for the title."),
    description: z
      .string()
      .trim()
      .min(10, "Use at least 10 characters for the description."),
    location: z.string().trim().min(1, "Location is required."),
  });

  async function handleSave() {
    const result = eventSchema.safeParse({
      title: title,
      description: description,
      location: location,
    });

    if (result.success === false) {
      setError(result.error.issues[0].message);
      return;
    }

    if (date.getTime() < Date.now()) {
      setError("Choose a date in the future.");
      return;
    }

    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, {
          title: result.data.title,
          description: result.data.description,
          location: result.data.location,
          date: date.toISOString(),
        });
        ToastAndroid.show("Changes saved", ToastAndroid.SHORT);
      } else {
        await addEvent(
          result.data.title,
          result.data.description,
          result.data.location,
          date.toISOString(),
          user.clubId,
          user.id,
        );
        ToastAndroid.show("Event added", ToastAndroid.SHORT);
      }
      router.back();
    } catch (e) {
      Alert.alert("Error", "Couldn't save the event.");
    }
  }

  return (
    <AppScreen>
      <Stack.Screen
        options={{ title: editingEvent ? "Edit event" : "Add event" }}
      />
      <View style={styles.viewGap}>
        <AppTextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter a title"
        />
        <AppTextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter a description"
        />
        <AppTextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Enter a location"
        />
        <View>
          <Text>{formatEventDate(date.toISOString())}</Text>
          <View style={styles.viewRow}>
            <AppButton
              style={{ backgroundColor: Colors.accent }}
              onPress={() => {
                setShowDate(true);
              }}
              text="Pick date"
            />
            <AppButton
              style={{ backgroundColor: Colors.accent }}
              onPress={() => {
                setShowTime(true);
              }}
              text="Pick time"
            />
          </View>
          {showDate === true && (
            <DateTimePicker
              value={date}
              mode="date"
              presentation="dialog"
              minimumDate={new Date()}
              onValueChange={(event, pickedDate) => {
                setShowDate(false);
                const newDate = new Date(date);
                newDate.setFullYear(
                  pickedDate.getFullYear(),
                  pickedDate.getMonth(),
                  pickedDate.getDate(),
                );
                setDate(newDate);
              }}
              onDismiss={() => {
                setShowDate(false);
              }}
            ></DateTimePicker>
          )}
          {showTime === true && (
            <DateTimePicker
              value={date}
              mode="time"
              presentation="dialog"
              onValueChange={(event, pickedTime) => {
                setShowTime(false);
                const newDate = new Date(date);
                newDate.setHours(
                  pickedTime.getHours(),
                  pickedTime.getMinutes(),
                );
                setDate(newDate);
              }}
              onDismiss={() => {
                setShowTime(false);
              }}
            ></DateTimePicker>
          )}
        </View>
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        <AppButton
          onPress={() => {
            handleSave();
          }}
          text="Save event"
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: Colors.danger,
  },
  viewGap: {
    gap: Spacing.small,
  },
  viewRow: {
    flexDirection: "row",
    gap: Spacing.extraSmall,
    marginTop: Spacing.extraSmall,
  },
});
