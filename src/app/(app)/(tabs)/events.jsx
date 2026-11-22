import { Text } from "react-native";
import AppScreen from "../../../components/AppScreen";
import EventCard from "../../../components/EventCard";
import { initialEvents } from "../../../data/mockData";

export default function Events() {
  return (
    <AppScreen>
      <Text>This is the Events Tab</Text>
      <EventCard
        onPress={() => {
          console.log("Pressed");
        }}
        clubName="CS3"
        event={initialEvents[0]}
      ></EventCard>
    </AppScreen>
  );
}
