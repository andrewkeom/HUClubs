import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "../../../components/AppButton";
import AppScreen from "../../../components/AppScreen";
import AppTextInput from "../../../components/AppTextInput";
import EmptyState from "../../../components/EmptyState";
import EventCard from "../../../components/EventCard";
import FilterTabs from "../../../components/FilterTabs";
import LoadingView from "../../../components/LoadingView";
import { Spacing } from "../../../constants/theme";
import { useAuth } from "../../../context/AuthContext";
import { useData } from "../../../context/DataContext";
import { findClubName } from "../../../lib/club";
import { pastDate } from "../../../lib/format";

export default function Events() {
  const { events, registrations, isLoading, error } = useData();
  const { user } = useAuth();

  const [filter, setFilter] = useState("upcoming");
  const [search, setSearch] = useState("");

  let options = [
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
  ];

  if (isLoading) {
    return <LoadingView />;
  }
  if (error) {
    return (
      <AppScreen>
        <EmptyState message="Couldn't load events." />
      </AppScreen>
    );
  }
  if (user.role === "student") {
    options.push({ key: "registered", label: "Registered" });
  }

  function filterEvents() {
    const filteredEvents = events.filter((event) => {
      if (filter === "upcoming") {
        return !pastDate(event.date);
      }
      if (filter === "past") {
        return pastDate(event.date);
      }
      if (filter === "registered") {
        return registrations.some((registration) => {
          return (
            registration.userId === user.id && registration.eventId === event.id
          );
        });
      }
      return false;
    });
    return filteredEvents;
  }

  let visibleEvents = filterEvents();
  const searchText = search.trim().toLowerCase();
  let searchResult = visibleEvents.filter((event) => {
    if (!searchText) {
      return true;
    }
    return (
      event.title.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText) ||
      findClubName(event.clubId).toLowerCase().includes(searchText)
    );
  });

  searchResult = searchResult.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (filter === "past") {
      return dateB - dateA;
    }
    return dateA - dateB;
  });

  let content;
  if (events.length === 0) {
    content = <EmptyState message="No events yet." />;
  } else if (searchResult.length === 0 && searchText) {
    content = (
      <EmptyState
        onPress={() => {
          setSearch("");
        }}
        buttonText="Clear search"
        message={'No events match "' + searchText + '".'}
      />
    );
  } else if (searchResult.length === 0 && !searchText) {
    if (filter === "upcoming") {
      content = <EmptyState message="No upcoming events." />;
    } else if (filter === "past") {
      content = <EmptyState message="No past events." />;
    } else {
      content = (
        <EmptyState
          onPress={() => {
            setFilter("upcoming");
          }}
          buttonText="Browse upcoming events"
          message="You haven't registered for any events yet."
        />
      );
    }
  } else {
    content = searchResult.map((event) => {
      return (
        <EventCard
          key={event.id}
          event={event}
          clubName={findClubName(event.clubId)}
          onPress={() => {
            openEvent(event.id);
          }}
        ></EventCard>
      );
    });
  }

  function openEvent(id) {
    router.push({ pathname: "/event/[id]", params: { id } });
  }

  function openEventForm() {
    router.push({ pathname: "/event-form" });
  }

  return (
    <AppScreen>
      <View style={styles.viewGap}>
        <AppTextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by title, club or location"
        ></AppTextInput>
        <FilterTabs options={options} selected={filter} onSelect={setFilter} />
        {user.role === "officer" && (
          <AppButton
            onPress={() => {
              openEventForm();
            }}
            text="Add event"
          />
        )}
      </View>
      {content}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  viewGap: {
    gap: Spacing.extraSmall,
    marginBottom: Spacing.small,
  },
});
