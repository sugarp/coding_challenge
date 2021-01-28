import { MINUTE_TO_PIXEL } from "../../../constants";
import { msToMin } from "../../../utils";

function calculateWidth(start: Date, end: Date) {
  const minutes = msToMin(end.getTime() - start.getTime());
  const width = minutes * MINUTE_TO_PIXEL;

  return width;
}

export default calculateWidth;