import React from 'react';
import Counter from '../counter/Counter';
import Hormones from '../hormones/Hormones';
import Phases from '../phases/Phases';
import './Visualizer.css';

export const Visualizer = ({
  dayCount,
  handleOvulation,
  handlePreOvulation,
  handleStart,
  handleStop,
  isStarted,
  ovulation,
  ovulationActive,
  preOvulationActive,
  postOvulation,
  preOvulation,
  secretLhFsh,
  secretOestro,
  secretProgest,
}) => (
  <div className="Visualizer-Container">
    <Phases
      handleOvulation={handleOvulation}
      handlePreOvulation={handlePreOvulation}
      ovulationActive={ovulationActive}
      preOvulationActive={preOvulationActive}
      preOvulation={preOvulation}
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
