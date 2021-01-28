import { DateTime } from "luxon";
import styled from "styled-components"
import { MINUTE_TO_PIXEL_RATIO as MINUTE_TO_PIXEL_RATIO } from "../constants";
import { msToMin } from "../generator/utils/time";
import { TimeEvent } from "../types/TimeEvent";
import { calculateLeftValue, calculateWidthValue } from "../utils";

interface Props {
  timeLineStart: DateTime;
  item: TimeEvent;
}

const Root = styled.div<{ left: number, width: number }>`
  position: absolute;
  left: ${({left}) => left}px;
  width: ${({width}) => width}px;
  height: 80px;
  border: 1px solid;
  box-sizing: border-box;
  top: 50%;
  margin-top: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Event: React.FC<Props> = ({ timeLineStart, item }) => {
  const { start, end, name } = item;

  const left = calculateLeftValue(timeLineStart, DateTime.fromISO(start))
  const width = calculateWidthValue(DateTime.fromISO(start), DateTime.fromISO(end))

  return (
    <Root left={left} width={width}>{name}</Root>
  )
}

export default Event;