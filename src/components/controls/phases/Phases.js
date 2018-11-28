import React from 'react';
import PropTypes from 'prop-types';
import './Phases.css';
import { Button } from 'reactstrap';
// here we have our pre-ovulatio, ovulation and post-ovulation buttons
// then we make sure all other buttons are disabled when one is clicked
export const Phases = ({
  handleOvulation,
  handlePostOvulation,
  handlePreOvulation,
  ovulationActive,
  preOvulationActive,
  postOvulationActive,
  t,
}) => (
  <div className="phases-container">
    <div className="phases-title">
      <span className="select-step">{t('Select step')}</span>
    </div>
    <div className="phases">
      <Button
        disabled={ovulationActive || postOvulationActive}
        outline
        color="secondary"
        className={`${preOvulationActive ? 'active-preovulation' : ''} pre-ovulation`}
        onClick={handlePreOvulation}
      >
        {t('Pre-Ovulation')}
      </Button>
      <Button
        disabled={preOvulationActive || postOvulationActive}
        outline
        color="secondary"
        className={`${ovulationActive ? 'active-ovulation' : ''} mx-2 ovulation`}
        onClick={handleOvulation}
      >
        {t('Ovulation')}
      </Button>
      <Button
        disabled={ovulationActive || preOvulationActive}
        outline
        color="secondary"
        className={`${postOvulationActive ? 'active-postovulation' : ''} post-ovulation`}
        onClick={handlePostOvulation}
      >
        {t('Post-Ovulation')}
      </Button>
    </div>
  </div>
);

Phases.propTypes = {
  handleOvulation: PropTypes.func.isRequired,
  handlePostOvulation: PropTypes.func.isRequired,
  handlePreOvulation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
};

export default (Phases);
