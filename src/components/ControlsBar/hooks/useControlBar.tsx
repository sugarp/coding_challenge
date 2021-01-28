import { isEmpty, last } from "lodash";
import { DateTime } from "luxon";
import { Moment } from "moment";
import { useCallback, useContext, useEffect, useState } from "react";
import EventsContext from "../../../contexts/EventsContext/EventsContext";
import SelectedTimeContext from "../../../contexts/SelectedTimeContext";
interface Response {
  start: DateTime,
  end: DateTime,
  nameFilterValue: null | string;
  nameFilterOptions: Array<string>;
  onStartChange: (value: Moment | string) => void;
  onEndChange: (value: Moment | string) => void;
  onFilterChange: (value: string | null) => void;
}

function useControlsBar(): Response {
  const [nameFilterValue, setNameFilterValue] = useState<string | null>(null);
  const { filterEventsByName, organizers } = useContext(EventsContext);
  const { setEnd, setStart, start, end } = useContext(SelectedTimeContext);

  const onStartChange = useCallback((value: Moment | string) => {
    setStart(DateTime.fromISO((value as Moment).toISOString()));
  }, [setStart]);

  const onEndChange = useCallback((value: Moment | string) => {
    setEnd(DateTime.fromISO((value as Moment).toISOString()));
  }, [setEnd]);

  const onFilterChange = useCallback((value: string | null) => {
    setNameFilterValue(value);
  }, [setNameFilterValue]);

  useEffect(() => {
    filterEventsByName(isEmpty(nameFilterValue) ? null : nameFilterValue);
  }, [nameFilterValue]);

  return {
    start,
    end,
    nameFilterValue,
    nameFilterOptions: organizers,
    onStartChange,
    onEndChange,
    onFilterChange
  }
}

export default useControlsBar;