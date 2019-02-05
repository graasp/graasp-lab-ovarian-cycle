import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Counter.css';
import { Button } from 'reactstrap';
import { withNamespaces } from 'react-i18next';

// deciding what happen on the launch/stop cycle button cycle
// the t is used for the translation
export const Counter = ({
  handleFullCycle,
  handleStop,
  isStarted,
  ovulationActive,
  preOvulationActive,
  postOvulationActive,
  t,
  themeColor,
}) => {
  const isDisabled = preOvulationActive || ovulationActive || postOvulationActive;
  // show stop button if simulation started otherwise show start
  const startButton = (isStarted)
    ? (
      <Button
        onClick={handleStop}
        size="lg"
        disabled={isDisabled}
        style={{ backgroundColor: themeColor, borderColor: themeColor }}
        className="btn-full-cycle"
      >
        {t('Stop Cycle')}
      </Button>
    )
    : (
      <Button
        onClick={handleFullCycle}
        size="lg"
        disabled={isDisabled}
        style={{ backgroundColor: themeColor, borderColor: themeColor }}
        className="btn-full-cycle"
      >
        {t('Full Cycle')}
      </Button>
    );
  return (
    <div className="counter-container">
      <div className="description-content">
        <h2>{t('Description')}</h2>
        <p>
          {t('Lab Explanation')}
        </p>
      </div>
      <div className="clock-setter">
        {startButton}
        <hr className="separator-line" />
      </div>
    </div>
  );
};

Counter.propTypes = {
  handleFullCycle: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  preOvulationActive: state.simulation.preOvulationActive,
  postOvulationActive: state.simulation.postOvulationActive,
  ovulationActive: state.simulation.ovulationActive,
});

const ConnectedComponent = connect(mapStateToProps)(Counter);

export default withNamespaces()(ConnectedComponent);
