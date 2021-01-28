import React from "react";
import { TimeEvent } from "../../types/TimeEvent";

export interface EventsContextValue {
  events: Array<TimeEvent>;
  organizers: string[];
  loading: boolean;
  filterEventsByName: (name: string | null) => void,
}

const EventsContext = React.createContext<EventsContextValue>({
  events: [],
  organizers: [],
  loading: false,
  filterEventsByName: (name: string | null) => {}
});

export default EventsContext;