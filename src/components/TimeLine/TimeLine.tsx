import React, { useCallback, useContext, useMemo, useRef } from 'react';
import styled from 'styled-components';
import EventsContext from '../../contexts/EventsContext/EventsContext';
import calculateWidth from './utils/calculateWidth';
import { last, first } from 'lodash';
import SelectedTimeContext from '../../contexts/SelectedTimeContext';
import { DateTime } from 'luxon';
import { MINUTE_TO_PIXEL } from '../../constants';

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
  const width = calculateWidth(timeLineStart.toJSDate(), new Date(last(events)?.end ?? ""));
  const contentRef = useRef<HTMLDivElement| null>(null);
  const rootRef = useRef<HTMLDivElement| null>(null);

  const onClick = useCallback((e: React.MouseEvent) => {
    const originalDuration = selectedTime.end.diff(selectedTime.start).as("minutes");
    const timeLineScreenOffset = contentRef.current!.getBoundingClientRect().left;
    const clickTimeLineCoordinate = e.clientX - timeLineScreenOffset;
    const newStart = timeLineStart.plus({ minutes: clickTimeLineCoordinate / MINUTE_TO_PIXEL });

    selectedTime.setStart(newStart);
    selectedTime.setEnd(newStart.plus({ minutes: originalDuration }))
  }, [])

  return (
    <Root ref={rootRef}>
      <Content ref={contentRef} width={width} onClick={onClick}>{children}</Content>
    </Root>
  )
}

export default TimeLine;