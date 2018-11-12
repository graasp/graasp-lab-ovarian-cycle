import React from 'react';
import Counter from './Counter';
import Hormones from './Hormones';

export const Visualizer = ({ handleStart, handleStop, seconds }) => (
  <div className="Visualizer-Container">
    <Counter
      handleStart={handleStart}
      handleStop={handleStop}
      seconds={seconds}
    />
    <Hormones />
  </div>
);

export default (Visualizer);
