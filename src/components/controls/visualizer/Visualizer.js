import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import Counter from '../counter/Counter';
import Phases from '../phases/Phases';
import { AppState } from '../../../config/AppState';
import './Visualizer.css';

// importing all different child components and
// pass them params they need
export class Visualizer extends Component {
  state = AppState;

  static propTypes = {
    handleFullCycle: PropTypes.func.isRequired,
    handleStop: PropTypes.func.isRequired,
    handleOvulation: PropTypes.func.isRequired,
    handlePostOvulation: PropTypes.func.isRequired,
    handlePreOvulation: PropTypes.func.isRequired,
    isStarted: PropTypes.bool.isRequired,
  };

  render() {
    const {
      handleOvulation,
      handlePostOvulation,
      handlePreOvulation,
      handleFullCycle,
      handleStop,
      isStarted,
    } = this.props;
    return (
      <div className="visualizer-container">
        <Counter
          handleFullCycle={handleFullCycle}
          handleStop={handleStop}
          isStarted={isStarted}
        />
        <Phases
          handleOvulation={handleOvulation}
          handlePostOvulation={handlePostOvulation}
          handlePreOvulation={handlePreOvulation}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
});

const ConnectedComponent = connect(mapStateToProps)(Visualizer);

export default ConnectedComponent;
