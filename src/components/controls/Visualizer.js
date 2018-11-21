import React from 'react';
import Counter from './counter/Counter';
import Hormones from './hormones/Hormones';
import Phases from './phases/Phases';
import './Visualizer.css';

export const Visualizer = ({
  dayCount,
  handleStart,
  handleStop,
  ovulation,
  postOvulation,
  preOvulation,
  secretLhFsh,
  secretOestro,
  secretProgest,
}) => (
  <div className="Visualizer-Container">
    <Phases />
    <Counter
      handleStart={handleStart}
      handleStop={handleStop}
      dayCount={dayCount}
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
