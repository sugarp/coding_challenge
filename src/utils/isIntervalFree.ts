import { DateTime } from "luxon";
import { TimeEvent } from "../types/TimeEvent";

function isIntervalFree(events: TimeEvent[], intervalStart: DateTime, intervalEnd: DateTime) {
  for(let event of events) {
    const start = intervalStart.toMillis();
    const end = intervalEnd.toMillis();

    const eventStart = DateTime.fromISO(event.start).toMillis();
    const eventEnd = DateTime.fromISO(event.end).toMillis();

    if(eventStart < start && eventEnd > end) return false;
    if(eventStart >= start && eventStart <= end) return false;
    if(eventEnd <= end && eventEnd > start) return false;

    if(eventEnd > end) return true;
  }

  return true;
}

export default isIntervalFree;