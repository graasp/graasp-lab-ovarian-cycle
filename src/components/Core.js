import React from 'react';
import Body from './body/Body';
import Visualizer from './controls/Visualizer';
import { Row } from 'reactstrap';

export const Core = ({
  preOvulation,
  handleStart,
  handleStop,
  seconds,
  secretLhFsh,
  secretProgest,
  secretOestro }) => (
  <div className="Core-Container">
    <Row>
      <div className="w-60">
        <Body />
      </div>
      <div className="w-40">
        <Visualizer
          preOvulation={preOvulation}
          handleStart={handleStart}
          handleStop={handleStop}
          seconds={seconds}
          secretLhFsh={secretLhFsh}
          secretProgest={secretProgest}
          secretOestro={secretOestro}
        />
      </div>
    </Row>
  </div>
);

export default (Core);
