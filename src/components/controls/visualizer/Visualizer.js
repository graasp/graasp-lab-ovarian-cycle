import React from 'react';
import PropTypes from 'prop-types';
import Counter from '../counter/Counter';
import Hormones from '../hormones/Hormones';
import Phases from '../phases/Phases';
import Refresher from './refresher/Refresher';
import TabComponent from './TabComponent';
import './Visualizer.css';
// importing all different child components and
// pass them params they need
export const Visualizer = ({
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
  obserViewActive,
  t,
}) => (
  <div className="visualizer-container">
    <TabComponent
      obserViewActive={obserViewActive}
      t={t}
    />
    <Counter
      handleStart={handleStart}
      handleStop={handleStop}
      isStarted={isStarted}
      ovulationActive={ovulationActive}
      postOvulationActive={postOvulationActive}
      preOvulationActive={preOvulationActive}
      t={t}
    />
    <Phases
      handleOvulation={handleOvulation}
      handlePostOvulation={handlePostOvulation}
      handlePreOvulation={handlePreOvulation}
      ovulationActive={ovulationActive}
      postOvulationActive={postOvulationActive}
      preOvulationActive={preOvulationActive}
      preOvulation={preOvulation}
      t={t}
    />
    <Hormones
      ovulation={ovulation}
      postOvulation={postOvulation}
      preOvulation={preOvulation}
      secreteLhFsh={secreteLhFsh}
      secreteProgest={secreteProgest}
      secreteOestro={secreteOestro}
      t={t}
    />
    <Refresher
      reloadPage={reloadPage}
    />
  </div>
);

Visualizer.propTypes = {
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  handleOvulation: PropTypes.func.isRequired,
  handlePostOvulation: PropTypes.func.isRequired,
  handlePreOvulation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
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
  obserViewActive: PropTypes.bool.isRequired,
};
export default (Visualizer);
