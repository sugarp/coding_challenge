import { useEffect, useMemo, useState } from "react";
import fetchEvents from "../../api/fetchEvents";
import { TimeEvent } from "../../types/TimeEvent";
import EventsContext, { EventsContextValue } from "./EventsContext";

const EventsContextProvider: React.FC = ({ children }) => {
  const [nameFilter, setNameFilter] = useState<null | string>(null);
  const [allEvents, setAllEvents] = useState<TimeEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const organizers = useMemo(() => {
    return Array.from(new Set<string>(allEvents.map(event => event.name)))
  }, [allEvents]);

  const value = useMemo<EventsContextValue>(() => ({
    loading,
    organizers,
    events: nameFilter ? allEvents.filter(event => event.name === nameFilter) : allEvents,
    filterEventsByName: setNameFilter,
  }), [allEvents, nameFilter, loading, setNameFilter]);

  useEffect(() => {
    setLoading(true);
    fetchEvents().then(events => {
      setAllEvents(events.data)
      setLoading(false);
    })   
  }, []);


  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

export function withEventsProvider<P>(Component: React.ComponentType<P>): React.FC<P> {
  return (props: P) => {
    return (
      <EventsContextProvider>
        <Component {...props} />
      </EventsContextProvider>
    );
  }
}

export default EventsContextProvider;