import React from 'react';
import Body from './body/Body';
import Visualizer from './controls/visualizer/Visualizer';
import { Row } from 'reactstrap';

export const Core = ({
  dayCount,
  isStarted,
  ovulation,
  ovulationActive,
  preOvulationActive,
  postOvulationActive,
  handleOvulation,
  handlePostOvulation,
  handlePreOvulation,
  handleStart,
  handleStop,
  postOvulation,
  preOvulation,
  secretLhFsh,
  secretOestro,
  secretProgest,
}) => (
  <div className="Core-Container">
    <Row>
      <div className="w-60">
        <Body />
      </div>
      <div className="w-40">
        <Visualizer
          dayCount={dayCount}
          isStarted={isStarted}
          handleOvulation={handleOvulation}
          handlePostOvulation={handlePostOvulation}
          handlePreOvulation={handlePreOvulation}
          handleStart={handleStart}
          handleStop={handleStop}
          ovulation={ovulation}
          ovulationActive={ovulationActive}
          preOvulationActive={preOvulationActive}
          postOvulationActive={postOvulationActive}
          postOvulation={postOvulation}
          preOvulation={preOvulation}
          secretLhFsh={secretLhFsh}
          secretOestro={secretOestro}
          secretProgest={secretProgest}
        />
      </div>
    </Row>
  </div>
);

export default (Core);
