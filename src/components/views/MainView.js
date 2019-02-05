import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { toast } from 'react-toastify';
import { withStyles } from '@material-ui/core/styles';
import Msg from '../controls/cycles/Msg';
import {
  GREEN,
  ORANGE,
  PURPLE_BLUE,
  SKY_BLUE,
} from '../../config/constants';
import SideMenu from '../layout/SideMenu';
import { AppState } from '../../config/AppState';
import {
  preOvulationState,
  ovulationState,
  postOvulationState,
} from '../../actions';
import Refresher from '../controls/visualizer/refresher/Refresher';
import Main from '../layout/Main';
import styles from '../controls/common/Styles';

export class MainView extends Component {
  static propTypes = {
    dispatchPreOvulationState: PropTypes.func.isRequired,
    dispatchPostOvulationState: PropTypes.func.isRequired,
    dispatchOvulationState: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  // here we get all our initial state from the AppState component
  state = AppState;

  // we make sure the hormone path is created when the app mounts
  componentDidMount() {
    this.createHormoneFlow();
  }

  componentDidUpdate(prevProps) {
    const { svg } = prevProps;
    if (!svg) {
      this.createHormoneFlow();
    }
  }

  // this function handles all the ovarian life cycle events
  // from begening until the cycle ends
  // we use the delay to wait during 5s from the 12 until the 14th day
  tickFullCycle = () => {
    const { delay, dayCount } = this.state;
    const secString = `${dayCount}`;
    if (dayCount === 1 || dayCount === 11 || dayCount === 15) { this.notify(); }
    // if in the pre-ovulation phase, we do not secretee lh or fsh
    if (dayCount < 12) {
      this.setState({
        preOvulation: true,
        ovulation: false,
        secreteLhFsh: true,
        postOvulation: false,
      });
      this.updateLh();
      const preOvulationActive = false;
      const preOvulationStep = true;
      const { dispatchPreOvulationState } = this.props;
      dispatchPreOvulationState({ preOvulationActive, preOvulationStep });
    }

    // during the 12-13-14 this is the ovulation period
    if (dayCount >= 12 && dayCount <= 14 && delay > 0) {
      const ovulationActive = false;
      const ovulationStep = true;
      const { dispatchOvulationState, dispatchPreOvulationState } = this.props;
      const preOvulationActive = false;
      const preOvulationStep = false;
      dispatchPreOvulationState({ preOvulationActive, preOvulationStep });
      dispatchOvulationState({ ovulationActive, ovulationStep });
      // Update initial state to increase Oestrogen and FSH hormones
      this.updateOestrogen();
      this.updateFsh();
      this.updateLh();
      this.setState({
        delay: delay - 1,
        secreteLhFsh: true,
        preOvulation: true,
        secreteOestro: true,
        ovulation: false,
        postOvulation: false,
      });
      // during the last day of ovulation we secret more fsh,lh and estrogen homones
      // then we stop the preOvulation cycle and update in all components
      if (dayCount === 14) {
        this.setState({
          ovulation: true,
          secreteLhFsh: true,
          secreteOestro: true,
          preOvulation: false,
        });
      }
      return;
    }
    if (dayCount >= 15) {
      // Update initial state to increase progesterones hormones
      // this happens after the ovulation ends
      // we call the updateProgesteron function to secrete more progesterones
      this.updateProgesteron();
      this.setState({
        secreteProgest: true,
        postOvulation: true,
        ovulation: false,
        secreteLhFsh: false,
        preOvulation: false,
        secreteOestro: false,
      });
      const postOvulationActive = false;
      const postOvulationStep = true;
      const ovulationActive = false;
      const preOvulationActive = false;
      const preOvulationStep = false;
      const ovulationStep = false;
      const {
        dispatchPostOvulationState,
        dispatchPreOvulationState,
        dispatchOvulationState,
      } = this.props;
      dispatchPostOvulationState({ postOvulationActive, postOvulationStep });
      dispatchPreOvulationState({ preOvulationActive, preOvulationStep });
      dispatchOvulationState({ ovulationActive, ovulationStep });
    }
    this.updateTimeState(dayCount, secString);
    // at the end of the cycle we make sure stop all homone secretion
    if (dayCount === 27) {
      this.setState({
        secreteProgest: false,
        secreteOestro: false,
        isStarted: false,
      });
      // then we stop the day counter
      clearInterval(this.intervalHandle);
      const postOvulationActive = false;
      const ovulationActive = false;
      const preOvulationActive = false;
      const preOvulationStep = false;
      const ovulationStep = false;
      const postOvulationStep = false;
      const {
        dispatchPreOvulationState,
        dispatchOvulationState,
        dispatchPostOvulationState,
      } = this.props;
      dispatchPreOvulationState({ preOvulationActive, preOvulationStep });
      dispatchOvulationState({ ovulationActive, ovulationStep });
      dispatchPostOvulationState({ postOvulationActive, postOvulationStep });
    }
  };

  // this is called when the pre-ovulation button is clicked
  // we make sure only show the pre-ovulation step only
  tickPreOvulation = () => {
    const { dayCount } = this.state;
    const secString = `${dayCount}`;

    if (dayCount < 12) {
      this.setState({
        preOvulation: true,
        secreteLhFsh: true,
        postOvulation: false,
        ovulation: false,
      });
      // during this period we make sure the lh and fsh hormones are updated
      this.updateLh();
    }
    this.updateTimeState(dayCount, secString);

    if (dayCount === 11) {
      clearInterval(this.intervalHandle);
      this.setState({
        preOvulation: true,
        secreteLhFsh: false,
        preOvulationActive: false,
      });
      const preOvulationActive = false;
      const { dispatchPreOvulationState } = this.props;
      dispatchPreOvulationState({ preOvulationActive });
    }
  };

  // this is called when the pos-ovulation button is clicked
  // we make sure only show the post-ovulation step only
  tickPostOvulation = () => {
    const { dayCount } = this.state;
    const secString = `${dayCount}`;

    if (dayCount >= 14) {
      // Update initial state to increase progesterones hormones
      this.updateProgesteron();
      this.setState({
        secreteLhFsh: false,
        secreteProgest: true,
        secreteOestro: false,
        ovulation: false,
        postOvulation: true,
        preOvulation: false,
      });
    }

    this.updateTimeState(dayCount, secString);

    if (dayCount === 27) {
      clearInterval(this.intervalHandle);
      this.setState({
        secreteProgest: false,
        secreteOestro: false,
        postOvulationActive: false,
      });
      const postOvulationActive = false;
      const { dispatchPostOvulationState } = this.props;
      dispatchPostOvulationState({ postOvulationActive });
    }
  };

  // this is called when the ovulation button is clicked
  // we make sure only show the ovulation step only
  tickOvulation = () => {
    const {
      dayCount,
      delay,
    } = this.state;
    const secString = `${dayCount}`;

    if (dayCount >= 12 && dayCount <= 14 && delay > 0) {
      // Update initial state to increase Oestrogen and FSH hormones
      // during this period we update all hormones exepts the progesterones
      this.updateOestrogen();
      this.updateFsh();
      this.updateLh();
      this.setState({
        delay: delay - 1,
        secreteLhFsh: true,
        secreteOestro: true,
        postOvulation: false,
        preOvulation: true,
      });
      if (dayCount === 14) {
        this.setState({
          preOvulation: false,
          ovulation: true,
          ovulationActive: false,
        });
        const ovulationActive = false;
        const { dispatchOvulationState } = this.props;
        dispatchOvulationState({ ovulationActive });
      }
      return;
    }

    this.updateTimeState(dayCount, secString);

    if (dayCount === 14) {
      clearInterval(this.intervalHandle);
      this.setState({
        secreteLhFsh: false,
        secreteOestro: false,
      });
    }
  };

  // this is our lh updating function
  updateLh = () => {
    // eslint-disable-next-line react/prop-types
    const { svg } = this.props;
    const { lhPoints } = this.state;
    let nextColor = SKY_BLUE;
    const translate = `translate(${lhPoints[0]})`;
    this.updateHormone({
      data: lhPoints,
      elemClass: 'ted',
      hormClass: '.lh-hormones',
      circleFill: () => {
        nextColor = nextColor === SKY_BLUE ? ORANGE
          : SKY_BLUE;
        return nextColor;
      },
      circleTransform: translate,
      path: svg.selectAll('.lh-hormones'),
    });
  };

  // this is our fsh updating function
  updateFsh = () => {
    const { svg } = this.props;
    const { fshPoints } = this.state;
    let nextColor = SKY_BLUE;
    const translate = `translate(${fshPoints[0]})`;
    this.updateHormone({
      data: fshPoints,
      elemClass: 'fsh',
      hormClass: '.fsh-hormones',
      circleFill: () => {
        nextColor = nextColor === SKY_BLUE ? ORANGE
          : SKY_BLUE;
        return nextColor;
      },
      circleTransform: translate,
      path: svg.selectAll('.fsh-hormones'),
    });
  };

  // this is our estrogens updating function
  updateOestrogen = () => {
    const { svg } = this.props;
    const { oestrogenePoints } = this.state;
    const translate = `translate(${oestrogenePoints[8]})`;
    this.updateHormone({
      data: oestrogenePoints,
      elemClass: 'oestros',
      hormClass: '.oestro-hormones',
      circleFill: GREEN,
      circleTransform: translate,
      path: svg.selectAll('.oestro-hormones'),
    });
  };

  // this is our progesteron updating function
  updateProgesteron = () => {
    const { svg } = this.props;
    const { progesteronePoints } = this.state;
    const translate = `translate(${progesteronePoints[8]})`;
    this.updateHormone({
      data: progesteronePoints,
      elemClass: 'progests',
      hormClass: '.progest-hormones',
      circleFill: PURPLE_BLUE,
      circleTransform: translate,
      path: svg.selectAll('.progest-hormones'),
    });
  };

  // this is our time tate updater
  updateTimeState = (dayCount) => {
    if (dayCount <= 27) {
      this.setState({
        delay: 5,
        dayCount: dayCount + 1,
      });
    }
  };

  // here we listen to the pre-ovulation button click
  // then we update the inital state and set the day to the 1rst
  handlePreOvulation = () => {
    this.setState({
      dayCount: 1,
      ovulationActive: false,
      postOvulationActive: false,
      preOvulationActive: true,
    });
    const preOvulationActive = true;
    const { dispatchPreOvulationState } = this.props;
    dispatchPreOvulationState({ preOvulationActive });
    this.notify();
    this.intervalHandle = setInterval(this.tickPreOvulation, 2100);
    this.postMessage({
      phase: 'pre-ovulation',
      status: 'started',
    });
  };

  notify = () => toast(<Msg />, { position: toast.POSITION.BOTTOM_LEFT });

  // here we listen to the post-ovulation button click
  // then we update the inital state and set the day to the 14th
  handlePostOvulation = () => {
    this.setState({
      dayCount: 14,
      ovulationActive: false,
      postOvulationActive: true,
      preOvulationActive: false,
    });
    const postOvulationActive = true;
    const { dispatchPostOvulationState } = this.props;
    dispatchPostOvulationState({ postOvulationActive });
    this.notify();
    this.intervalHandle = setInterval(this.tickPostOvulation, 2100);
    this.postMessage({
      phase: 'post-ovulation',
      status: 'started',
    });
  };

  // here we listen to the ovulation button click
  // then we update the inital state and set the day to the 12th
  handleOvulation = () => {
    this.setState({
      dayCount: 12,
      ovulationActive: true,
      postOvulationActive: false,
      preOvulationActive: false,
    });
    const ovulationActive = true;
    const { dispatchOvulationState } = this.props;
    dispatchOvulationState({ ovulationActive });
    this.notify();
    this.intervalHandle = setInterval(this.tickOvulation, 2100);
    this.postMessage({
      phase: 'ovulation',
      status: 'started',
    });
  };

  // here we listen to the start button clicked
  // to launch all the ovulation cycle
  handleFullCycle = () => {
    this.setState({ isStarted: true, dayCount: 0 });
    this.intervalHandle = setInterval(this.tickFullCycle, 2100);
    this.postMessage({ start_full_cycle: true });
  };

  // here we listen to the stop button clicked
  // to stop all the ovulation cycle
  handleStop = () => {
    this.setState({
      dayCount: 0,
      isStarted: false,
      secreteLhFsh: false,
      secreteOestro: false,
      secreteProgest: false,
      postOvulation: false,
      preOvulation: false,
      ovulation: false,
    });
    clearInterval(this.intervalHandle);
    this.postMessage({ start_full_cycle: false });
    const preOvulationActive = false;
    const preOvulationStep = false;
    const { dispatchPreOvulationState } = this.props;
    const ovulationActive = false;
    const ovulationStep = false;
    const { dispatchOvulationState } = this.props;
    const postOvulationActive = false;
    const postOvulationStep = false;
    const { dispatchPostOvulationState } = this.props;
    dispatchPreOvulationState({ preOvulationActive, preOvulationStep });
    dispatchOvulationState({ ovulationActive, ovulationStep });
    dispatchPostOvulationState({ postOvulationActive, postOvulationStep });
  };

  postMessage = (data) => {
    const message = JSON.stringify(data);
    if (document.postMessage) {
      document.postMessage(message, '*');
    } else if (window.postMessage) {
      window.postMessage(message, '*');
    } else {
      console.error('unable to find postMessage');
    }
  };


  // here we pass appropriate hormones classes, path datas,
  // color, path and the transformat propertites
  // to make the trnasition along the path specified
  updateHormone = ({
    data,
    elemClass,
    circleFill,
    circleTransform,
    path,
  }) => {
    const { svg } = this.props;
    const lhElem = svg.selectAll(`.${elemClass}`).data(data, (d, i) => i);
    lhElem
      .enter()
      .append('circle')
      .attr('class', elemClass)
      .attr('r', 40)
      .attr('fill', circleFill)
      .attr('transform', circleTransform);

    const trans = () => {
      lhElem
        .transition()
        .duration((d, i) => i * 300 + 2000)
        .attrTween('transform', this.translateAlong(path.node()));
      //  lhElem.on("end", trans); This could be used to make transition infinite
    };
    trans();
  };

  translateAlong = (path) => {
    const l = path.getTotalLength();
    return () => (t) => {
      const p = path.getPointAtLength(t * l);
      return `translate(${p.x},${p.y})`;
    };
  };

  // this is our crete hormones function that is called right after our app loads
  createHormoneFlow = () => {
    const {
      lhPoints, fshPoints,
      progesteronePoints, oestrogenePoints,
    } = this.state;
    const { svg } = this.props;
    if (!svg) {
      return;
    }
    svg.append('path')
      .data([lhPoints])
      .attr('class', 'lh-hormones')
      .attr('d', d3.line());
    svg.append('path')
      .data([fshPoints])
      .attr('class', 'fsh-hormones')
      .attr('d', d3.line());
    svg.append('path')
      .data([progesteronePoints])
      .attr('class', 'progest-hormones')
      .attr('d', d3.line());
    svg.append('path')
      .data([oestrogenePoints])
      .attr('class', 'oestro-hormones')
      .attr('d', d3.line());
    svg.selectAll('.point')
      .data(lhPoints)
      .enter()
      .append('circle')
      .attr('fill', SKY_BLUE)
      .attr('r', 20)
      .attr('transform', d => `translate(${d})`);
    svg.selectAll('.point')
      .data(fshPoints)
      .enter()
      .append('circle')
      .attr('fill', ORANGE)
      .attr('r', 20)
      .attr('transform', d => `translate(${d})`);
    svg.selectAll('.point')
      .data(progesteronePoints)
      .enter()
      .append('circle')
      .attr('fill', PURPLE_BLUE)
      .attr('r', 20)
      .attr('transform', d => `translate(${d})`);
    svg.selectAll('.point')
      .data(oestrogenePoints)
      .enter()
      .append('circle')
      .attr('fill', GREEN)
      .attr('r', 20)
      .attr('transform', d => `translate(${d})`);
  };

  // when rendering we pass all state params to our first child component
  // which will pass them to the next children components
  render() {
    const {
      dayCount,
      isStarted,
      ovulation,
      ovulationActive,
      postOvulationActive,
      preOvulationActive,
      postOvulation,
      preOvulation,
      secreteLhFsh,
      secreteProgest,
      secreteOestro,
      obserViewActive,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Main
          dayCount={dayCount}
          secreteLhFsh={secreteLhFsh}
          secreteProgest={secreteProgest}
          secreteOestro={secreteOestro}
        />
        <SideMenu
          dayCount={dayCount}
          handleOvulation={this.handleOvulation}
          handlePostOvulation={this.handlePostOvulation}
          handlePreOvulation={this.handlePreOvulation}
          handleFullCycle={this.handleFullCycle}
          handleStop={this.handleStop}
          isStarted={isStarted}
          ovulation={ovulation}
          ovulationActive={ovulationActive}
          preOvulationActive={preOvulationActive}
          postOvulationActive={postOvulationActive}
          postOvulation={postOvulation}
          preOvulation={preOvulation}
          secreteLhFsh={secreteLhFsh}
          secreteProgest={secreteProgest}
          secreteOestro={secreteOestro}
          obserViewActive={obserViewActive}
        />
        <Refresher />
      </div>
    );
  }
}

// we make sure the svg is gotten from our redux state and is mounted
const mapStateToProps = state => ({
  svg: state.svg.svg,
});

const mapDispatchToProps = {
  dispatchPreOvulationState: preOvulationState,
  dispatchOvulationState: ovulationState,
  dispatchPostOvulationState: postOvulationState,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MainView);

const StyledComponent = withStyles(styles)(ConnectedComponent);

export default StyledComponent;
