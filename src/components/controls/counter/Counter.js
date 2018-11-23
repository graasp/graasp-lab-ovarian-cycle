import React from 'react';
import PropTypes from 'prop-types';
import './Counter.css';
import { Button } from 'reactstrap';

const Counter = ({
  dayCount,
  handleStart,
  handleStop,
  isStarted,
}) => {
  // show stop button if simulation started otherwise show start
  const startButton = (isStarted)
    ? <Button className="Button-stop" onClick={handleStop}>Stop cycle</Button>
    : <Button className="Button-start" onClick={handleStart}>Start cycle</Button>;
  return (
    <div className="Counter-Container">
      <div className="clock-setter">
        <p className="select-step"> ...or launch the cycle </p>
        {startButton}
      </div>
      <div className="clock-container">
        <div className="clock-balls">
          <div className="clock-timer">
            <span className="clock-counter">
              {dayCount}
            </span>
            <span className="clock-dayer"> DAYS </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Counter.propTypes = {
  dayCount: PropTypes.number.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
};
export default (Counter);
