import { MINUTE_TO_PIXEL_RATIO } from "../constants";
import { DateTime } from "luxon";
import { TimeEvent } from "../types/TimeEvent";

export function calculateLeftValue(timeLineStart: DateTime, selectedStart: DateTime) {
    return selectedStart.diff(timeLineStart).as("minutes") * MINUTE_TO_PIXEL_RATIO
}

export function calculateWidthValue(selectedStart: DateTime, selectedEnd: DateTime) {
    return selectedEnd.diff(selectedStart).as("minutes") * MINUTE_TO_PIXEL_RATIO;
}

export function isIntervalFree(events: TimeEvent[], intervalStart: DateTime, intervalEnd: DateTime): boolean {
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
