import React from 'react';
import Body from './body/Body';
import Visualizer from './controls/visualizer/Visualizer';
import { Row } from 'reactstrap';

export const Core = ({
  dayCount,
  ovulation,
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
          handleStart={handleStart}
          handleStop={handleStop}
          ovulation={ovulation}
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
