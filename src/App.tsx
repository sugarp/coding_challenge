import React, { useContext, useMemo } from 'react';
import { generateEvents } from './generator';
import Event from './components/Event'
import Timeline from './components/TimeLine';
import { withEventsProvider } from './contexts/EventsContext/EventsContextProvider';
import { withSelectedTimeContextProvider } from './contexts/SelectedTimeContext/SelectedTimeContextProvider';
import SelectedTime from './components/SelectedTime/SelectedTime';
import { DateTime } from 'luxon';
import EventsContext from './contexts/EventsContext/EventsContext';
import ControlBar from './components/ControlBar/ControlBar';
import styled from 'styled-components';

const Root = styled.div`
  padding: 2rem;
`;

const StyledControlBar = styled(ControlBar)`
  margin: 2rem 0;
`;

function App() {
  const { events } = useContext(EventsContext);
  const timeLineStart = useMemo(() => DateTime.local().set({ minute: 0, hour: 0, second: 0, millisecond: 0 }), []);

  return (
    <Root className="App">
      <StyledControlBar timeLineStart={timeLineStart}/>
      <Timeline timeLineStart={timeLineStart}>
        <SelectedTime timeLineStart={timeLineStart} />
        {
          events.map(item => (
            <Event item={item} timeLineStart={timeLineStart}/>
          ))
        }
      </Timeline>
    </Root>
  );
}

export default withSelectedTimeContextProvider(withEventsProvider(App));
