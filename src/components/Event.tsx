import styled from "styled-components"
import { MINUTE_TO_PIXEL as MINUTE_TO_PIXEL_RATIO } from "../constants";
import { TimeEvent } from "../types/TimeEvent";
import { msToMin } from "../utils";

interface Props {
  timeLineStart: Date;
  item: TimeEvent;
}

const Root = styled.div<{ left: number, width: number }>`
  position: absolute;
  left: ${({left}) => left}px;
  width: ${({width}) => width}px;
  height: 50px;
  border: 1px solid;
`;

const Event: React.FC<Props> = ({ timeLineStart, item }) => {
  const { start, end, name } = item;
  const left = msToMin(new Date((start)).getTime() - new Date(timeLineStart).getTime()) * MINUTE_TO_PIXEL_RATIO;
  const width = msToMin(new Date(end).getTime() - new Date(start).getTime()) * MINUTE_TO_PIXEL_RATIO;

  return (
    <Root left={left} width={width}>{name}</Root>
  )
}

export default Event;