import React from 'react';
import PropTypes from 'prop-types';
import './Counter.css';
import { Button } from 'reactstrap';

const Counter = ({
  handleStart,
  handleStop,
  isStarted,
  ovulationActive,
  preOvulationActive,
  postOvulationActive,
}) => {
  const isDisabled = preOvulationActive || ovulationActive || postOvulationActive;
  // show stop button if simulation started otherwise show start
  const startButton = (isStarted)
    ? <Button className="Button-stop" onClick={handleStop} size="lg" disabled={isDisabled}>Stop cycle</Button>
    : <Button className="Button-start" onClick={handleStart} size="lg" disabled={isDisabled}>Launch Cycle</Button>;
  return (
    <div className="Counter-Container">
      <div className="clock-setter">
        {startButton}
        <p className="select-step">
          <span className="or">OR</span>
        </p>
      </div>
    </div>
  );
};

Counter.propTypes = {
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
};
export default (Counter);
