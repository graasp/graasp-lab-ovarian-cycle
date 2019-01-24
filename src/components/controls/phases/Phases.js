import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Phases.css';
import { Button } from 'reactstrap';
// we make sure all other buttons are disabled when one is clicked
export const Phases = ({
  handleOvulation,
  handlePostOvulation,
  handlePreOvulation,
  ovulationActive,
  preOvulationActive,
  postOvulationActive,
  preOvulationStep,
  ovulationStep,
  postOvulationStep,
  t,
}) => (
  <div className="phases-container">
    <div className="phases">
      <Button
        disabled={
          ovulationActive || postOvulationActive || preOvulationStep
          || ovulationStep || postOvulationStep
        }
        outline
        color="secondary"
        className={`${preOvulationActive ? 'active-preovulation' : ''} ${preOvulationStep ? 'pre-ovulation' : ''} cycle-phase`}
        onClick={handlePreOvulation}
      >
        {t('Pre-Ovulation')}
      </Button>
      <br />
      <Button
        disabled={
          preOvulationActive || postOvulationActive || preOvulationStep
          || ovulationStep || postOvulationStep
        }
        outline
        color="secondary"
        className={`${ovulationActive ? 'active-ovulation' : ''} ${ovulationStep ? 'ovulation' : ''} m-2 cycle-phase`}
        onClick={handleOvulation}
      >
        {t('Ovulation')}
      </Button>
      <br />
      <Button
        disabled={
          ovulationActive || preOvulationActive || preOvulationStep
          || ovulationStep || postOvulationStep
        }
        outline
        color="secondary"
        className={`${postOvulationActive ? 'active-postovulation' : ''} ${postOvulationStep ? 'post-ovulation' : ''} cycle-phase`}
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

const mapStateToProps = state => ({
  preOvulationActive: state.setting.preOvulationActive,
  postOvulationActive: state.setting.postOvulationActive,
  ovulationActive: state.setting.ovulationActive,
  preOvulationStep: state.setting.preOvulationStep,
  ovulationStep: state.setting.ovulationStep,
  postOvulationStep: state.setting.postOvulationStep,
});


export default connect(mapStateToProps)(Phases);
