import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Counter from '../counter/Counter';
import Cycles from '../cycles/Cycles';
import Phases from '../phases/Phases';
import Refresher from './refresher/Refresher';
import TabComponent from './TabComponent';
import { AppState } from '../../../config/AppState';
import './Visualizer.css';
import {
  defaultLang,
  themeColor,
} from '../../../actions';
// importing all different child components and
// pass them params they need
export class Visualizer extends Component {
  state = AppState;

  handleChangeComplete = (color) => {
    const newColor = color.hex;
    const {
      dispatchThemeColor,
    } = this.props;
    dispatchThemeColor({ newColor });
    this.postMessage({
      themeColor: newColor,
    });
  }

  handleLang = (lang) => {
    const newLang = lang.value;
    const {
      dispatchDefaultLanguage,
    } = this.props;
    dispatchDefaultLanguage({ newLang });
    this.postMessage({
      defaultLang: newLang,
    });
  }

  onOpenModal = () => {
    this.setState({
      openModal: true,
    });
    this.postMessage({
      open_setting_modal: true,
    });
  }

  onCloseModal = () => {
    this.setState({
      openModal: false,
    });
    this.postMessage({
      open_setting_modal: false,
    });
  }

  postMessage = (data) => {
    const message = JSON.stringify(data);
    console.log('message', message);
    if (document.postMessage) {
      document.postMessage(message, '*');
    } else if (window.postMessage) {
      window.postMessage(message, '*');
    } else {
      console.error('unable to find postMessage');
    }
  };

  render() {
    const {
      openModal,
    } = this.state;
    const {
      handleOvulation,
      handlePostOvulation,
      handlePreOvulation,
      reloadPage,
      handleStart,
      handleStop,
      isStarted,
      ovulation,
      ovulationActive,
      postOvulationActive,
      preOvulationActive,
      postOvulation,
      preOvulation,
      secreteLhFsh,
      secreteOestro,
      secreteProgest,
      obserViewActive,
      t,
      themeColor,
    } = this.props;

    return (
      <div className="visualizer-container">
        <TabComponent
          obserViewActive={obserViewActive}
          t={t}
        />
        <Counter
          handleStart={handleStart}
          handleStop={handleStop}
          isStarted={isStarted}
          ovulationActive={ovulationActive}
          postOvulationActive={postOvulationActive}
          preOvulationActive={preOvulationActive}
          themeColor={themeColor}
          t={t}
        />
        <Phases
          handleOvulation={handleOvulation}
          handlePostOvulation={handlePostOvulation}
          handlePreOvulation={handlePreOvulation}
          ovulationActive={ovulationActive}
          postOvulationActive={postOvulationActive}
          preOvulationActive={preOvulationActive}
          preOvulation={preOvulation}
          t={t}
        />
        <Cycles
          ovulation={ovulation}
          postOvulation={postOvulation}
          preOvulation={preOvulation}
          secreteLhFsh={secreteLhFsh}
          secreteProgest={secreteProgest}
          secreteOestro={secreteOestro}
          t={t}
        />
        <Refresher
          reloadPage={reloadPage}
          onOpenModal={this.onOpenModal}
          onCloseModal={this.onCloseModal}
          openModal={openModal}
          handleChangeComplete={this.handleChangeComplete}
          handleLang={this.handleLang}
          themeColor={themeColor}
          t={t}
        />
      </div>
    );
  }
}

Visualizer.propTypes = {
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  handleOvulation: PropTypes.func.isRequired,
  handlePostOvulation: PropTypes.func.isRequired,
  handlePreOvulation: PropTypes.func.isRequired,
  dispatchThemeColor: PropTypes.func.isRequired,
  dispatchDefaultLanguage: PropTypes.func.isRequired,
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
  // themeColor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.themeColor,
});

const mapDispatchToProps = {
  dispatchThemeColor: themeColor,
  dispatchDefaultLanguage: defaultLang,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Visualizer);

export default (connectedComponent);
