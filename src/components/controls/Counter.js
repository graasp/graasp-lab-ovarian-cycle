import React from 'react';

export const Counter = ({ handleStart, handleStop }) => (
  <div className="Counter-Container">
    <div className="clock-container">
      <div className="clock-balls">
        <div className="clock-timer">
          <span className="clock-counter"> 01 </span>
          <span className="clock-dayer"> JOURS </span>
        </div>
      </div>
      <div className="clock-setter">
        <button className='button-start' onClick={handleStart}>START</button>
        <button className='button-stop' onClick={handleStop}>STOP</button>
      </div>
    </div>
  </div>
);

export default (Counter);
