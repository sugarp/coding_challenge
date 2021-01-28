import { isEmpty, last } from "lodash";
import { DateTime } from "luxon";
import { Moment } from "moment";
import { SyntheticEvent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import EventsContext from "../../../contexts/EventsContext/EventsContext";
import SelectedTimeContext from "../../../contexts/SelectedTimeContext";

function validateValue(min: DateTime, max: DateTime, value: DateTime) {
  if(value.toMillis() - min.toMillis() < 0) return min;

  if(value.toMillis() - max.toMillis() > 0) return max;

  return value;
}

function useControlBar(timeLineStart: DateTime) {
  const [nameFilterValue, setNameFilterValue] = useState<string | null>(null);
  const { events, filterEventsByName, organizers } = useContext(EventsContext);
  const { setEnd, setStart, start, end } = useContext(SelectedTimeContext);
  const maxDate = DateTime.fromISO(last(events)?.end ?? "");

  const onStartChange = useCallback((value: Moment | string) => {
    // @ts-ignore
    // const validatedValue = validateValue(timeLineStart, maxDate, DateTime.fromMillis(value.milliseconds()));

    setStart(DateTime.fromISO((value as Moment).toISOString()));
  }, []);

  const onEndChange = useCallback((value: Moment | string) => {
    // @ts-ignore
    // const validatedValue = validateValue(timeLineStart, maxDate, )

    setEnd(DateTime.fromISO((value as Moment).toISOString()));
  }, []);

  const onFilterChange = useCallback((value: string | null) => {
    setNameFilterValue(value);
  }, []);

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

export default useControlBar;