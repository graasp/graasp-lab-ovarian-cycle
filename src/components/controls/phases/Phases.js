import React from 'react';
import PropTypes from 'prop-types';
import './Phases.css';
import { Button } from 'reactstrap';

export const Phases = ({
  handleOvulation,
  handlePostOvulation,
  handlePreOvulation,
  ovulationActive,
  preOvulationActive,
  postOvulationActive,
}) => (
  <div className="Phases-Container">
    <div className="phases-title">
      <span className="select-step"> Select step... </span>
    </div>
    <div className="phases">
      <Button
        outline
        color="secondary"
        className={`${preOvulationActive ? 'active-preovulation' : ''} pre-ovulation`}
        onClick={handlePreOvulation}
      >
        Pre-Ovulation
      </Button>
      <Button
        outline
        color="secondary"
        className={`${ovulationActive ? 'active-ovulation' : ''} mx-2 ovulation`}
        onClick={handleOvulation}
      >
        Ovulation
      </Button>
      <Button
        outline
        color="secondary"
        className={`${postOvulationActive ? 'active-postovulation' : ''} post-ovulation`}
        onClick={handlePostOvulation}
      >
        Post-Ovulation
      </Button>
    </div>
  </div>
);

Phases.propTypes = {
  handleOvulation: PropTypes.func.isRequired,
  handlePostOvulation: PropTypes.func.isRequired,
  handlePreOvulation: PropTypes.func.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
};

export default (Phases);
