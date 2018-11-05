import React from 'react';
import Counter from './Counter';
import Hormones from './Hormones';

export const Visualizer = ({ d3, handleStart, handleStop }) => (
  <div className="Visualizer-Container">
    <Counter d3={d3}
      handleStart={handleStart}
      handleStop={handleStop}
    />
    <Hormones d3={d3} />
  </div>
);

export default (Visualizer);
