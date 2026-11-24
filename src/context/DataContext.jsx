import {
  initialEvents,
  initialMemberships,
  initialRegistrations,
} from "../data/mockData";
import { loadData, saveData } from "../lib/storage";

import { createContext, useContext, useEffect, useState } from "react";

const HU_EVENTS = "hu_events";
const HU_MEMBERSHIPS = "hu_memberships";
const HU_REGISTRATIONS = "hu_registrations";

export const DataContext = createContext(null);

export default function DataProvider(props) {
  const [events, setEvents] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadAll() {
      try {
        const currentEvents = await loadData(HU_EVENTS, initialEvents);
        const currentMemberships = await loadData(
          HU_MEMBERSHIPS,
          initialMemberships,
        );
        const currentRegistrations = await loadData(
          HU_REGISTRATIONS,
          initialRegistrations,
        );

        setEvents(currentEvents);
        setMemberships(currentMemberships);
        setRegistrations(currentRegistrations);
      } catch (e) {
        setError(true);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    loadAll();
  }, []);

  async function deleteEvent(id) {
    const eventResult = events.filter((event) => {
      if (event.id !== id) {
        return true;
      }
      return false;
    });

    const registrationsResult = registrations.filter((registration) => {
      if (registration.eventId !== id) {
        return true;
      }
      return false;
    });

    try {
      await saveData(HU_EVENTS, eventResult);
      await saveData(HU_REGISTRATIONS, registrationsResult);
      setEvents(eventResult);
      setRegistrations(registrationsResult);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async function addEvent(
    title,
    description,
    location,
    date,
    clubId,
    createdBy,
  ) {
    const ids = events.map((event) => {
      return event.id;
    });

    let newId = 0;
    if (ids.length !== 0) {
      newId = Math.max(...ids);
    }
    newId = newId + 1;

    const event = {
      id: newId,
      clubId: clubId,
      title: title,
      description: description,
      location: location,
      date: date,
      createdBy: createdBy,
    };

    const result = [...events, event];
    try {
      await saveData(HU_EVENTS, result);
      setEvents(result);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async function updateEvent(id, event) {
    const result = events.map((e) => {
      if (e.id === id) {
        return { ...e, ...event };
      }
      return e;
    });

    try {
      await saveData(HU_EVENTS, result);
      setEvents(result);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return (
    <DataContext
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        memberships,
        registrations,
        isLoading,
        error,
      }}
    >
      {props.children}
    </DataContext>
  );
}

export function useData() {
  return useContext(DataContext);
}
