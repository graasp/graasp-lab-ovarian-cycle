import React from 'react';

export const Counter = ({ handleStart, handleStop, status }) => (
  <div className="Counter-Container">
    <div className="clock-container">
      <div className="clock-balls">
        <div className="clock-timer">
          <span className="clock-counter"> 01 </span>
          <span className="clock-dayer"> JOURS </span>

        </div>
      </div>
      <div className="clock-setter">
        <button className='button-start' onClick={handleStart}>
          {status ? 'Stop' : 'Start'}
        </button>
        <button className='button-stop' onClick={handleStop}>Reset</button>
      </div>
    </div>
  </div>
);

export default (Counter);
