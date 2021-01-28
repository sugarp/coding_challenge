import { DateTime } from "luxon";
import { useContext } from "react";
import styled from "styled-components";
import { MINUTE_TO_PIXEL } from "../../constants";
import EventsContext from "../../contexts/EventsContext/EventsContext";
import SelectedTimeContext from "../../contexts/SelectedTimeContext";
import isIntervalFree from "../../utils/isIntervalFree";

interface RootProps {
  left: number;
  width: number;
  free: boolean;
}

const Root = styled.div<RootProps>`
  position: absolute;
  height: 100%;
  border-left: 5px solid #585858;
  border-right: 5px solid #585858;
  width: ${({ width }) => width}px;
  left: ${({ left }) => left}px;
  background:${({ free }) => free ? "#4CAF50" : "#f44336b8"};
  z-index: 1;
  transition: all 170ms ease-in;
  box-sizing: border-box;
`;

interface SelectedTimeProps {
  timeLineStart: DateTime;
}

const SelectedTime: React.FC<SelectedTimeProps> = ({ timeLineStart }) => {
  const eventsContext = useContext(EventsContext);
  const selectedTimeContext = useContext(SelectedTimeContext);
  const left = selectedTimeContext.start.diff(timeLineStart).as("minutes") * MINUTE_TO_PIXEL;
  const width = selectedTimeContext.end.diff(selectedTimeContext.start).as("minutes") * MINUTE_TO_PIXEL;
  const free = isIntervalFree(eventsContext.events, selectedTimeContext.start, selectedTimeContext.end);
  
  return (
    <Root left={left} width={width} free={free}/>
  )
};

export default SelectedTime;