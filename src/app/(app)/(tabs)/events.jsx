import { useState } from "react";
import { Text } from "react-native";
import AppScreen from "../../../components/AppScreen";
import EmptyState from "../../../components/EmptyState";
import EventCard from "../../../components/EventCard";
import FilterTabs from "../../../components/FilterTabs";
import { initialEvents } from "../../../data/mockData";

export default function Events() {
  const [filter, setFilter] = useState("upcoming");

  const options = [
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
    { key: "registered", label: "Registered" },
  ];

  return (
    <AppScreen>
      <Text>{filter}</Text>
      <FilterTabs options={options} selected={filter} onSelect={setFilter} />
      <EventCard
        onPress={() => {
          console.log("Pressed");
        }}
        clubName="CS3"
        event={initialEvents[0]}
      ></EventCard>
      <EmptyState message="No events yet."></EmptyState>
      <EmptyState message="No events match."></EmptyState>
      <EmptyState message="Couldn't load events."></EmptyState>
    </AppScreen>
  );
}
