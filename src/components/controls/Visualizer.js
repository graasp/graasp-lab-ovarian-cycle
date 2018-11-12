import React from 'react';
import Counter from './Counter';
import Hormones from './Hormones';

export const Visualizer = ({
  handleStart,
  handleStop,
  seconds,
  secretLhFsh,
  secretProgest,
  secretOestro }) => (
  <div className="Visualizer-Container">
    <Counter
      handleStart={handleStart}
      handleStop={handleStop}
      seconds={seconds}
    />
    <Hormones
      secretLhFsh={secretLhFsh}
      secretProgest={secretProgest}
      secretOestro={secretOestro}
    />
  </div>
);

export default (Visualizer);
