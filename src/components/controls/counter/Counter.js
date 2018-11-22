import React from 'react';
import './Counter.css';
import { Button } from 'reactstrap';

export class Counter extends React.Component {
  render() {
    const {
      dayCount,
      handleStart,
      handleStop,
      isStarted,
    } = this.props;

    // show stop button if simulation starter otherwise show start
    let startButton = (isStarted) ?
      <Button className='Button-stop' onClick={handleStop}>Stop cycle</Button> :
      <Button className='Button-start' onClick={handleStart}>Start cycle</Button>
    return (
      <div className="Counter-Container">
        <div className="clock-setter">
          <p className="select-step"> ...or launch the cycle </p>
          {startButton}
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
  }
}

export default (Counter);
