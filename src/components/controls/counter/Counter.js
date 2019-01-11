import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Counter.css';
import { Button } from 'reactstrap';
// deciding what happen on the launch/stop cycle button cycle
// the t is used for the translation
const Counter = ({
  handleStart,
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
      >
        {t('Stop Cycle')}
      </Button>
    )
    : (
      <Button
        onClick={handleStart}
        size="lg"
        disabled={isDisabled}
        style={{ backgroundColor: themeColor, borderColor: themeColor }}
      >
        {t('Launch Cycle')}
      </Button>
    );
  return (
    <div className="counter-container">
      <div className="description-content">
        <h2>Description</h2>
        <p>
          Il va permettre à l’apprenant d’interagir sur les taux des hormones ovariennes
          (œstrogènes et progestérone) et hypophysaires (FSH et LH) pour comprendre comment
          ces hormones contrôlent le cycle ovarien et comment elles assurent l’ovulation
        </p>
      </div>
      <div className="clock-setter">
        {startButton}
        <p className="select-step">
          <span className="or">{t('OR')}</span>
        </p>
      </div>
    </div>
  );
};

Counter.propTypes = {
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
});

export default connect(mapStateToProps)(Counter);
