import React from 'react';
import Counter from '../counter/Counter';
import Hormones from '../hormones/Hormones';
import Phases from '../phases/Phases';
import './Visualizer.css';

export const Visualizer = ({
  dayCount,
  handleOvulation,
  handleStart,
  handleStop,
  isStarted,
  ovulation,
  postOvulation,
  preOvulation,
  secretLhFsh,
  secretOestro,
  secretProgest,
}) => (
  <div className="Visualizer-Container">
    <Phases
      handleOvulation={handleOvulation}
    />
    <Counter
      dayCount={dayCount}
      handleStart={handleStart}
      handleStop={handleStop}
      isStarted={isStarted}
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
