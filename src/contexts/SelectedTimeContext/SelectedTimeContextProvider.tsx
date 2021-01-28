import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import SelectedTimeContext, { SelectedTimeContextValue } from "./SelectedTimeContext";

const SelectedTimeContextProvider: React.FC = ({ children }) => {
  const [start, setStart] = useState<DateTime>(DateTime.local());
  const [end, setEnd] = useState<DateTime>(DateTime.local().plus({ hours: 1 }));
  const value = useMemo<SelectedTimeContextValue>(() => ({
    start,
    end,
    setStart,
    setEnd
  }), [start, end, setStart, setEnd])

  return (
    <SelectedTimeContext.Provider value={value}>{children}</SelectedTimeContext.Provider>
  );
}

export const withSelectedTimeContextProvider = <P extends Record<string, any>>(Component: React.ComponentType<P>): React.FC<P> => {
  return (props: P) => (
    <SelectedTimeContextProvider>
      <Component {...props} />
    </SelectedTimeContextProvider>
  );
}

export default SelectedTimeContextProvider;