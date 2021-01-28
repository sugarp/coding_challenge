import { DateTime } from "luxon";
import { MINUTE_TO_PIXEL_RATIO } from "../../constants";

function calculateWidth(start: DateTime, end: DateTime) {
  const minutes = end.diff(start).as("minutes");
  const width = minutes * MINUTE_TO_PIXEL_RATIO;

  return width;
}

export default calculateWidth;