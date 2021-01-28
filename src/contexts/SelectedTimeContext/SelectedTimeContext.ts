import { DateTime } from "luxon";
import React from "react";

export interface SelectedTimeContextValue {
  start: DateTime,
  end: DateTime,
  setStart: (value: DateTime) => void,
  setEnd: (value: DateTime) => void
}

const SelectedTimeContext = React.createContext<SelectedTimeContextValue>({
  start: DateTime.local(),
  end: DateTime.local(),
  setStart: () => {},
  setEnd: () => {}
});

export default SelectedTimeContext;