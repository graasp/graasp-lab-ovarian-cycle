import React from 'react';
import Body from './body/Body';
import Visualizer from './controls/Visualizer';
import { Row } from 'reactstrap';

export const Core = ({ handleStart, handleStop }) => (
  <div className="Core-Container">
    <Row>
      <div className="w-47">
        <Body />
      </div>
      <div className="w-52">
        <Visualizer
          handleStart={handleStart}
          handleStop={handleStop}
        />
      </div>
    </Row>
  </div>
);

export default (Core);
