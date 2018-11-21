import React from 'react';
import Counter from './counter/Counter';
import Hormones from './hormones/Hormones';
import Phases from './phases/Phases';
import './Visualizer.css';

export const Visualizer = ({
  ovulation,
  postOvulation,
  preOvulation,
  handleStart,
  handleStop,
  seconds,
  secretLhFsh,
  secretProgest,
  secretOestro }) => (
  <div className="Visualizer-Container">
    <Phases
      seconds={seconds}
    />
    <Counter
      handleStart={handleStart}
      handleStop={handleStop}
      seconds={seconds}
    />
    <Hormones
      ovulation={ovulation}
      postOvulation={postOvulation}
      preOvulation={preOvulation}
      secretLhFsh={secretLhFsh}
      secretProgest={secretProgest}
      secretOestro={secretOestro}
    />
  </div>
);

export default (Visualizer);
