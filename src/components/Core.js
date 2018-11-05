import React from 'react';
import Body from './body/Body';
import Visualizer from './controls/Visualizer';
import { Row } from 'reactstrap';

export const Core = ({ d3, handleStart, handleStop }) => (
  <div className="Core-Container">
    <Row>
      <div className="w-47">
        <Body d3={d3} />
      </div>
      <div className="w-52">
        <Visualizer d3={d3}
          handleStart={handleStart}
          handleStop={handleStop}
        />
      </div>
    </Row>
  </div>
);

export default (Core);
