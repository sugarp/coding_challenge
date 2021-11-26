import axios from "axios";
import { generateEvents } from "../generator";
import { TimeEvent } from "../types/TimeEvent";

function fetchEvents() {
  // return axios.get<TimeEvent[]>(`${process.env.PUBLIC_URL}/events.json`);

  return Promise.resolve(generateEvents())
}

export default fetchEvents;