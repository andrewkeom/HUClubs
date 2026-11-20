import {
    initialEvents,
    initialMemberships,
    initialRegistrations,
} from "@/data/mockData";
import { loadData } from "@/lib/storage";

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

  return (
    <DataContext
      value={{ events, memberships, registrations, isLoading, error }}
    >
      {props.children}
    </DataContext>
  );
}

export function useData() {
  return useContext(DataContext);
}
