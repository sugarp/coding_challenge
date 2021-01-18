import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { generateEvents } from './generator';
import styled from 'styled-components';
import Event from './components/Event'

const Timeline = styled.div`
  position: relative;
`;

function App() {
  const events = useMemo(() => generateEvents(), []);
  const timeLineStart = useMemo(() => new Date(), []);

  return (
    <div className="App">
      <body>
        <Timeline>
          {
            events.map(item => (
              <Event item={item} timeLineStart={timeLineStart}/>
            ))
          }
        </Timeline>
      </body>
    </div>
  );
}

export default App;
