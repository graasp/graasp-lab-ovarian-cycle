import React from 'react';
import PropTypes from 'prop-types';
import Calendar from '../counter/Calendar';
import Counter from '../counter/Counter';
import Hormones from '../hormones/Hormones';
import Phases from '../phases/Phases';
import Refresher from './Refresher';
import './Visualizer.css';

export const Visualizer = ({
  dayCount,
  handleOvulation,
  handlePostOvulation,
  handlePreOvulation,
  reloadPage,
  handleStart,
  handleStop,
  isStarted,
  ovulation,
  ovulationActive,
  postOvulationActive,
  preOvulationActive,
  postOvulation,
  preOvulation,
  secreteLhFsh,
  secreteOestro,
  secreteProgest,
}) => (
  <div className="visualizer-container">
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
      secreteLhFsh={secreteLhFsh}
      secreteProgest={secreteProgest}
      secreteOestro={secreteOestro}
    />
    <Refresher
      reloadPage={reloadPage}
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
  reloadPage: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  ovulation: PropTypes.bool.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
  postOvulation: PropTypes.bool.isRequired,
  preOvulation: PropTypes.bool.isRequired,
  secreteLhFsh: PropTypes.bool.isRequired,
  secreteOestro: PropTypes.bool.isRequired,
  secreteProgest: PropTypes.bool.isRequired,
};
export default (Visualizer);
