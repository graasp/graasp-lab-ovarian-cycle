import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Body from '../body/Body';
import Hormones from '../controls/hormones/Hormones';
import Calendar from '../controls/calendar/Calendar';
import Visualizer from '../controls/visualizer/Visualizer';
import './Core.css';
// this is our sub main component
// it renders the body and all the part containing
// the dynamic informations of our application
export const Core = ({
  dayCount,
  isStarted,
  ovulation,
  ovulationActive,
  preOvulationActive,
  postOvulationActive,
  reloadPage,
  handleOvulation,
  handlePostOvulation,
  handlePreOvulation,
  handleStart,
  handleStop,
  postOvulation,
  preOvulation,
  secreteLhFsh,
  secreteOestro,
  secreteProgest,
  obserViewActive,
  themeColor,
  t,
}) => {
  const defaultColor = themeColor || '#0f94f8';
  return (
    <div className="core-container">
      <Row>
        <Col md={12}>
          <h1 className="lab-title" style={{ backgroundColor: defaultColor }}>{t('Synchronization of the ovarian cycle')}</h1>
        </Col>
      </Row>
      <Row>
        <Col sm="8">
          <Hormones
            ovulation={ovulation}
            postOvulation={postOvulation}
            preOvulation={preOvulation}
            secreteLhFsh={secreteLhFsh}
            secreteProgest={secreteProgest}
            secreteOestro={secreteOestro}
            t={t}
          />
          <Body />
        </Col>
        <Col sm="4">
          <Calendar
            dayCount={dayCount}
            themeColor={themeColor}
          />
          <Visualizer
            dayCount={dayCount}
            isStarted={isStarted}
            handleOvulation={handleOvulation}
            handlePostOvulation={handlePostOvulation}
            handlePreOvulation={handlePreOvulation}
            reloadPage={reloadPage}
            handleStart={handleStart}
            handleStop={handleStop}
            ovulation={ovulation}
            ovulationActive={ovulationActive}
            preOvulationActive={preOvulationActive}
            postOvulationActive={postOvulationActive}
            postOvulation={postOvulation}
            preOvulation={preOvulation}
            secreteLhFsh={secreteLhFsh}
            secreteOestro={secreteOestro}
            secreteProgest={secreteProgest}
            obserViewActive={obserViewActive}
            themeColor={themeColor}
            t={t}
          />
        </Col>
      </Row>
    </div>
  );
};

Core.propTypes = {
  dayCount: PropTypes.number.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  handleOvulation: PropTypes.func.isRequired,
  handlePostOvulation: PropTypes.func.isRequired,
  handlePreOvulation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  reloadPage: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  ovulation: PropTypes.bool.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
  postOvulation: PropTypes.bool.isRequired,
  preOvulation: PropTypes.bool.isRequired,
  secreteLhFsh: PropTypes.bool.isRequired,
  secreteOestro: PropTypes.bool.isRequired,
  secreteProgest: PropTypes.bool.isRequired,
  obserViewActive: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
});

export default connect(mapStateToProps)(Core);
