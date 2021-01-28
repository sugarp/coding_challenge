import React, { useCallback, useContext, useMemo, useRef } from 'react';
import styled from 'styled-components';
import EventsContext from '../../contexts/EventsContext/EventsContext';
import calculateWidth from '../../generator/utils/calculateWidth';
import { last, first } from 'lodash';
import SelectedTimeContext from '../../contexts/SelectedTimeContext';
import { DateTime } from 'luxon';
import { MINUTE_TO_PIXEL_RATIO } from '../../constants';
import calculateNewInterval from './utils';

interface RootProps {
  width: number;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

const Content = styled.div<RootProps>`
  position: relative;
  height: 100px;
  background: #f0f0f0;
  width: ${({width}) => width}px;
`;

interface TimeLineProps {
  timeLineStart: DateTime;
}

const TimeLine: React.FC<TimeLineProps> = ({ children, timeLineStart }) => {
  const { events } = useContext(EventsContext);
  const selectedTime = useContext(SelectedTimeContext);
  const width = calculateWidth(timeLineStart, DateTime.fromISO(last(events)?.end ?? ""));
  const contentRef = useRef<HTMLDivElement| null>(null);

  const onClick = useCallback((e: React.MouseEvent) => {
    const { start, end } = calculateNewInterval(timeLineStart, selectedTime.start, selectedTime.end, contentRef.current!, e.clientX);

    selectedTime.setStart(start);
    selectedTime.setEnd(end);
  }, [selectedTime])

  return (
    <Root>
      <Content ref={contentRef} width={width} onClick={onClick}>{children}</Content>
    </Root>
  )
}

export default TimeLine;