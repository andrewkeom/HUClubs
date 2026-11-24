import { router, Stack } from "expo-router";
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [date, setDate] = useState(tomorrow);

  const { addEvent } = useData();
  const { user } = useAuth();

  const eventSchema = z.object({
    title: z.string().trim().min(3, "Use at least 3 characters for the title."),
    description: z
      .string()
      .trim()
      .min(10, "Use at least 10 characters for the description."),
    location: z.string().trim().min(1, "Location is required."),
  });

  async function handleAddEvent() {
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
      await addEvent(
        result.data.title,
        result.data.description,
        result.data.location,
        date.toISOString(),
        user.clubId,
        user.id,
      );
      ToastAndroid.show("Event added", ToastAndroid.SHORT);
      router.back();
    } catch (e) {
      Alert.alert("Error", "Couldn't save the event.");
    }
  }

  return (
    <AppScreen>
      <Stack.Screen options={{ title: "Add event" }} />
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
        </View>
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        <AppButton
          onPress={() => {
            handleAddEvent();
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
});
