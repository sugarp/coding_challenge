import React, { useContext, useMemo } from 'react';
import { generateEvents } from './generator';
import Event from './components/Event'
import Timeline from './components/TimeLine';
import { withEventsProvider } from './contexts/EventsContext/EventsContextProvider';
import { withSelectedTimeContextProvider } from './contexts/SelectedTimeContext/SelectedTimeContextProvider';
import SelectedTime from './components/SelectedTime/SelectedTime';
import { DateTime } from 'luxon';
import EventsContext from './contexts/EventsContext/EventsContext';
import ControlsBar from './components/ControlsBar/ControlsBar';
import styled from 'styled-components';
import Loader from './components/Loader';

const Root = styled.div`
  padding: 2rem;
`;

const StyledControlBar = styled(ControlsBar)`
  margin: 2rem 0;
`;

function App() {
  const { events, loading } = useContext(EventsContext);
  const timeLineStart = useMemo(() => DateTime.local().set({ minute: 0, hour: 0, second: 0, millisecond: 0 }), []);

  return (
    <Root className="App">
      <StyledControlBar timeLineStart={timeLineStart}/>      
      <Timeline timeLineStart={timeLineStart}>        
        <Loader loading={loading} />
        <SelectedTime timeLineStart={timeLineStart} />
        {
          events.map(item => (
            <Event key={item.id} item={item} timeLineStart={timeLineStart}/>
          ))
        }      
      </Timeline>
    </Root>
  );
}

export default withSelectedTimeContextProvider(withEventsProvider(App));
