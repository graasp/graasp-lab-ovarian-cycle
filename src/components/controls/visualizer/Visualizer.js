import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Counter from '../counter/Counter';
import Phases from '../phases/Phases';
import Refresher from './refresher/Refresher';
import { AppState } from '../../../config/AppState';
import './Visualizer.css';
import {
  defaultLang,
  themeColor,
  titleState,
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

  toggleTitle = () => {
    const { showTitle } = this.state;
    this.setState({ showTitle: !showTitle });
    const { dispatchTitleState } = this.props;
    dispatchTitleState({ showTitle });
    this.postMessage({
      show_title: showTitle,
    });
  }

  render() {
    const { openModal } = this.state;
    const {
      handleOvulation,
      handlePostOvulation,
      handlePreOvulation,
      reloadPage,
      handleStart,
      handleStop,
      isStarted,
      ovulationActive,
      postOvulationActive,
      t,
    } = this.props;
    return (
      <div className="visualizer-container">
        <Counter
          handleStart={handleStart}
          handleStop={handleStop}
          isStarted={isStarted}
          ovulationActive={ovulationActive}
          postOvulationActive={postOvulationActive}
          themeColor={themeColor}
          t={t}
        />
        <Phases
          handleOvulation={handleOvulation}
          handlePostOvulation={handlePostOvulation}
          handlePreOvulation={handlePreOvulation}
          t={t}
        />
        <ToastContainer autoClose={20000} />
        <Refresher
          reloadPage={reloadPage}
          onOpenModal={this.onOpenModal}
          onCloseModal={this.onCloseModal}
          openModal={openModal}
          handleChangeComplete={this.handleChangeComplete}
          handleLang={this.handleLang}
          toggleTitle={this.toggleTitle}
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
  dispatchTitleState: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  reloadPage: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
});

const mapDispatchToProps = {
  dispatchThemeColor: themeColor,
  dispatchDefaultLanguage: defaultLang,
  dispatchTitleState: titleState,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Visualizer);

export default (connectedComponent);
