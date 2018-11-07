import React from 'react';
import Counter from './Counter';
import Hormones from './Hormones';

export const Visualizer = ({ handleStart, handleStop, status }) => (
  <div className="Visualizer-Container">
    <Counter
      handleStart={handleStart}
      handleStop={handleStop}
      status={status}
    />
    <Hormones />
  </div>
);

export default (Visualizer);
