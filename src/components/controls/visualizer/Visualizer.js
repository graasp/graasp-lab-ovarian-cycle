import React from 'react';
import PropTypes from 'prop-types';
import Calendar from '../counter/Calendar';
import Counter from '../counter/Counter';
import Hormones from '../hormones/Hormones';
import Phases from '../phases/Phases';
import './Visualizer.css';

export const Visualizer = ({
  dayCount,
  handleOvulation,
  handlePostOvulation,
  handlePreOvulation,
  handleStart,
  handleStop,
  isStarted,
  ovulation,
  ovulationActive,
  postOvulationActive,
  preOvulationActive,
  postOvulation,
  preOvulation,
  secretLhFsh,
  secretOestro,
  secretProgest,
}) => (
  <div className="Visualizer-Container">
    <Counter
      handleStart={handleStart}
      handleStop={handleStop}
      isStarted={isStarted}
      ovulationActive={ovulationActive}
      postOvulationActive={postOvulationActive}
      preOvulationActive={preOvulationActive}
    />
    <Phases
      handleOvulation={handleOvulation}
      handlePostOvulation={handlePostOvulation}
      handlePreOvulation={handlePreOvulation}
      ovulationActive={ovulationActive}
      postOvulationActive={postOvulationActive}
      preOvulationActive={preOvulationActive}
      preOvulation={preOvulation}
    />
    <Calendar
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

Visualizer.propTypes = {
  dayCount: PropTypes.number.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  handleOvulation: PropTypes.func.isRequired,
  handlePostOvulation: PropTypes.func.isRequired,
  handlePreOvulation: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  ovulation: PropTypes.bool.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
  postOvulation: PropTypes.bool.isRequired,
  preOvulation: PropTypes.bool.isRequired,
  secretLhFsh: PropTypes.bool.isRequired,
  secretOestro: PropTypes.bool.isRequired,
  secretProgest: PropTypes.bool.isRequired,
};
export default (Visualizer);
