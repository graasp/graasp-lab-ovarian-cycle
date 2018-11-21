import React from 'react';
import './Counter.css';
import { Button } from 'reactstrap';

export const Counter = ({
  dayCount,
  handleStart,
  handleStop,
}) => (
  <div className="Counter-Container">
    <div className="clock-setter">
      <p className="select-step"> ...or launch the cycle </p>
      <Button className='Button-start' onClick={handleStart}>Start cycle</Button>
      &nbsp;<Button className='Button-stop' onClick={handleStop}>RESET</Button>
    </div>
    <div className="clock-container">
      <div className="clock-balls">
        <div className="clock-timer">
          <span className="clock-counter"> {dayCount} </span>
          <span className="clock-dayer"> DAYS </span>
        </div>
      </div>
    </div>
  </div>
);

export default (Counter);
