import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import Body from './body/Body';
import Visualizer from './controls/visualizer/Visualizer';

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
      <Col sm="8">
        <Body />
      </Col>
      <Col sm="4">
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
      </Col>
    </Row>
  </div>
);

Core.propTypes = {
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
export default (Core);
