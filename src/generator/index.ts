import { TimeEvent } from "../types/TimeEvent";
import names from "./constants/names";
import generateGuid from "./utils/generateGuid";
import randomInt from "./utils/randomInt";
import { minToMs, roundDate } from "./utils/time";

export function getRandomEvent(lastEnd: Date) {
  const offset = minToMs(randomInt(0, 300));
  const duration = minToMs(randomInt(45, 300));

  const startTime = lastEnd.getTime() + offset;
  const endTime = startTime + duration;

  const start = roundDate(new Date(startTime)).toISOString();
  const end = roundDate(new Date(endTime)).toISOString();

  return {
    start,
    end,
    id: generateGuid(),
    name: names[randomInt(0, names.length - 1)]
  }
}

export function generateEvents(): TimeEvent[] {
  const initialStart = roundDate(new Date()).toISOString();
  const ar: TimeEvent[] = [];

  for(let i = 0; i < 400; i++) {
    const last = ar[ar.length - 1]
    const start = last ? last.end : initialStart;

    ar.push(getRandomEvent(new Date(start)))
  }

  // @ts-ignore
  window.events = ar
  return ar;
}