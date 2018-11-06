import React from 'react';
import Counter from './Counter';
import Hormones from './Hormones';

export const Visualizer = ({ handleStart, handleStop }) => (
  <div className="Visualizer-Container">
    <Counter
      handleStart={handleStart}
      handleStop={handleStop}
    />
    <Hormones />
  </div>
);

export default (Visualizer);
