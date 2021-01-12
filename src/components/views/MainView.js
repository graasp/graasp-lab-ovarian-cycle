import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
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
  appearOvule,
  disappearOvule,
} from '../../actions';
import Refresher from '../controls/visualizer/refresher/Refresher';
import Main from '../layout/Main';
import styles from '../controls/common/Styles';

export class MainView extends Component {
  static propTypes = {
    dispatchAppearOvule: PropTypes.func.isRequired,
    dispatchPreOvulationState: PropTypes.func.isRequired,
    dispatchPostOvulationState: PropTypes.func.isRequired,
    dispatchOvulationState: PropTypes.func.isRequired,
    dispatchDisappearOvule: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
    svg: PropTypes.shape({}).isRequired,
    pituitary: PropTypes.bool.isRequired,
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
    const { dispatchAppearOvule } = this.props;
    const { delay, dayCount } = this.state;
    const secString = `${dayCount}`;
    if (dayCount === 1 || dayCount === 11 || dayCount === 15) { this.notify(); }
    // if in the pre-ovulation phase, we do not secretee lh or fsh
    if (dayCount <= 12) {
      this.setState({
        preOvulation: true,
        ovulation: false,
        // secreteLhFsh: true,
        postOvulation: false,
      });
      this.updateFsh(300, 2000);
      if (dayCount >= 2 && dayCount <= 7) {
        this.updateOestrogen(700, 2000);
      }
      if (dayCount >= 8 && dayCount <= 14) {
        this.updateOestrogen(100, 2000);
      }
      if (dayCount >= 11 && dayCount <= 13) {
        this.updateLh(100, 2000);
      }
      const preOvulationActive = false;
      const preOvulationStep = true;
      const { dispatchPreOvulationState } = this.props;
      dispatchPreOvulationState({ preOvulationActive, preOvulationStep });
    }
    // during the 12-13-14 this is the ovulation period
    if (dayCount >= 13 && dayCount <= 14 && delay > 0) {
      const ovulationActive = false;
      const ovulationStep = true;
      const { dispatchOvulationState, dispatchPreOvulationState } = this.props;
      const preOvulationActive = false;
      const preOvulationStep = false;
      dispatchPreOvulationState({ preOvulationActive, preOvulationStep });
      dispatchOvulationState({ ovulationActive, ovulationStep });
      // Update initial state to increase Oestrogen and FSH hormones
      this.updateOestrogen(80, 2500);
      this.updateFsh(300, 2000);
      // this.updateLh(80, 2500);
      this.setState({
        delay: delay - 1,
        // secreteLhFsh: true,
        preOvulation: true,
        // secreteOestro: true,
        ovulation: false,
        postOvulation: false,
      });
      // during the last day of ovulation we secret more fsh,lh and estrogen homones
      // then we stop the preOvulation cycle and update in all components
      if (dayCount === 14) {
        this.setState({
          ovulation: true,
          // secreteLhFsh: true,
          // secreteOestro: true,
          // secreteFsh: true,
          // secreteLh: true,
          preOvulation: false,
        });
        dispatchAppearOvule();
      }
      return;
    }
    if (dayCount >= 14) {
      // Update initial state to increase progesterones hormones
      // this happens after the ovulation ends
      // we call the updateProgesteron function to secrete more progesterones
      this.updateLh(700, 2000);
      this.updateFsh(700, 2000);
      if (dayCount >= 14 && dayCount <= 24) {
        this.updateProgesteron(100, 2000);
        this.updateOestrogen(100, 2000);
      }
      if (dayCount >= 25 && dayCount <= 28) {
        this.updateProgesteron(700, 2000);
        this.updateOestrogen(700, 2000);
      }
      this.setState({
        // secreteProgest: true,
        // secreteOestro: true,
        postOvulation: true,
        ovulation: false,
        // secreteLhFsh: false,
        preOvulation: false,
        // secreteOestro: false,
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
        secreteLh: false,
        secreteFsh: false,
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
    if (dayCount <= 13) {
      this.setState({
        preOvulation: true,
        // secreteLhFsh: true,
        postOvulation: false,
        ovulation: false,
      });
      // during this period we make sure the lh and fsh hormones are updated
      this.updateFsh(300, 2000);
      if (dayCount >= 11) {
        this.updateLh(100, 2000);
      }
      if (dayCount >= 1 && dayCount <= 7) {
        this.updateOestrogen(700, 2000);
      }
      if (dayCount >= 8 && dayCount <= 13) {
        this.updateOestrogen(100, 2000);
      }
      this.updateTimeState(dayCount, secString);
    }

    if (dayCount === 13) {
      clearInterval(this.intervalHandle);
      this.setState({
        preOvulation: true,
        // secreteLhFsh: false,
        secreteLh: false,
        secreteFsh: false,
        secreteOestro: false,
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

    if (dayCount >= 11) {
      this.updateFsh(700, 2000);
      this.updateLh(700, 2000);
    }
    if (dayCount <= 24) {
      this.updateOestrogen(100, 2000);
      this.updateProgesteron(100, 2000);
    }
    if (dayCount >= 25) {
      this.updateOestrogen(700, 2000);
      this.updateProgesteron(700, 2000);
    }

    // if (dayCount >= 14) {
    //   // Update initial state to increase progesterones hormones
    //   this.updateProgesteron(100, 2000);
    //   this.setState({
    //     secreteLhFsh: false,
    //     secreteProgest: true,
    //     secreteOestro: false,
    //     ovulation: false,
    //     postOvulation: true,
    //     preOvulation: false,
    //   });
    // }

    this.updateTimeState(dayCount, secString);

    if (dayCount === 27) {
      clearInterval(this.intervalHandle);
      this.setState({
        secreteLh: false,
        secreteFsh: false,
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
    const { dispatchAppearOvule } = this.props;
    const {
      dayCount,
      delay,
    } = this.state;
    const secString = `${dayCount}`;
    // console.log(delay);
    if (dayCount >= 13 && dayCount <= 14 && delay > 0) {
      // Update initial state to increase Oestrogen and FSH hormones
      // during this period we update all hormones exepts the progesterones

      if (dayCount === 13) {
        this.updateOestrogen(80, 2500);
        setTimeout(() => { this.updateFsh(300, 2000); }, 3000);
      }
      // this.updateLh(80, 2500);
      this.setState({
        delay: delay - 1,
        // secreteLhFsh: true,
        // secreteOestro: true,
        postOvulation: false,
        preOvulation: true,
      });
      if (dayCount === 14) {
        dispatchAppearOvule();
        // setTimeout(()=>{dispatchAppearOvule()}, 2100);
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
    if (dayCount >= 13 && dayCount <= 14) {
      this.updateTimeState(dayCount, secString);
    }
    if (dayCount === 14) {
      clearInterval(this.intervalHandle);
      this.setState({
        secreteLh: false,
        secreteFsh: false,
        secreteOestro: false,
      });
    }
  };

  // this is our lh updating function
  updateLh = (distance, speed) => {
    // eslint-disable-next-line react/prop-types
    this.setState({
      secreteLh: true,
    });
    const { svg } = this.props;
    const { lhPoints } = this.state;
    let nextColor = SKY_BLUE;
    const translate = `translate(${lhPoints[0]})`;
    // const translate2 = `translate(${lhPoints2[0]})`;
    this.updateHormone({
      data: lhPoints,
      elemClass: 'ted',
      hormClass: '.lh-hormones',
      circleFill: () => {
        // nextColor = nextColor === SKY_BLUE ? ORANGE
        //   : SKY_BLUE;
        nextColor = SKY_BLUE;
        return nextColor;
      },
      circleTransform: translate,
      path: svg.selectAll('.lh-hormones'),
      distance,
      speed,
    });
    // this.updateHormone({
    //   data: lhPoints2,
    //   elemClass: 'ted',
    //   hormClass: '.lh-hormones2',
    //   circleFill: () => {
    //     // nextColor = nextColor === SKY_BLUE ? ORANGE
    //     //   : SKY_BLUE;
    //     nextColor = SKY_BLUE;
    //     return nextColor;
    //   },
    //   circleTransform: translate2,
    //   path: svg.selectAll('.lh-hormones2'),
    //   distance,
    //   speed,
    // });
  };

  // this is our fsh updating function
  updateFsh = (distance, speed) => {
    this.setState({
      secreteFsh: true,
    });
    const { svg } = this.props;
    const { fshPoints } = this.state;
    let nextColor = SKY_BLUE;
    const translate = `translate(${fshPoints[0]})`;
    // const translate2 = `translate(${fshPoints2[0]})`;
    this.updateHormone({
      data: fshPoints,
      elemClass: 'fsh',
      hormClass: '.fsh-hormones',
      circleFill: () => {
        // nextColor = nextColor === SKY_BLUE ? ORANGE
        //   : SKY_BLUE;
        nextColor = ORANGE;
        return nextColor;
      },
      circleTransform: translate,
      path: svg.selectAll('.fsh-hormones'),
      distance,
      speed,
    });
    // this.updateHormone({
    //   data: fshPoints,
    //   elemClass: 'fsh2',
    //   hormClass: '.fsh-hormones2',
    //   circleFill: () => {
    //     // nextColor = nextColor === SKY_BLUE ? ORANGE
    //     //   : SKY_BLUE;
    //     nextColor = ORANGE;
    //     return nextColor;
    //   },
    //   circleTransform: translate2,
    //   path: svg.selectAll('.fsh-hormones2'),
    //   distance,
    //   speed,
    // });
  };

  // this is our estrogens updating function
  updateOestrogen = (distance, speed) => {
    this.setState({
      secreteOestro: true,
    });
    const { svg } = this.props;
    const { oestrogenePoints, oestrogenePoints2 } = this.state;
    const translate = `translate(${oestrogenePoints[8]})`;
    // const translate2 = `translate(${oestrogenePoints2[8]})`;
    this.updateHormone({
      data: oestrogenePoints,
      elemClass: 'oestros',
      hormClass: '.oestro-hormones',
      circleFill: GREEN,
      circleTransform: translate,
      path: svg.selectAll('.oestro-hormones'),
      distance,
      speed,
    });
    this.updateHormone({
      data: oestrogenePoints2,
      elemClass: 'oestros2',
      hormClass: '.oestro-hormones2',
      circleFill: GREEN,
      circleTransform: translate,
      path: svg.selectAll('.oestro-hormones2'),
      distance,
      speed,
    });
  };

  // this is our progesteron updating function
  updateProgesteron = (distance, speed) => {
    this.setState({
      secreteProgest: true,
    });
    const { svg } = this.props;
    const { progesteronePoints, progesteronePoints2 } = this.state;
    const translate = `translate(${progesteronePoints[8]})`;
    const translate2 = `translate(${progesteronePoints2[8]})`;
    this.updateHormone({
      data: progesteronePoints,
      elemClass: 'progests',
      hormClass: '.progest-hormones',
      circleFill: PURPLE_BLUE,
      circleTransform: translate,
      path: svg.selectAll('.progest-hormones'),
      distance,
      speed,
    });
    this.updateHormone({
      data: progesteronePoints2,
      elemClass: 'progests2',
      hormClass: '.progest-hormones2',
      circleFill: PURPLE_BLUE,
      circleTransform: translate2,
      path: svg.selectAll('.progest-hormones2'),
      distance,
      speed,
    });
  };

  // this is our time tate updater
  updateTimeState = (dayCount) => {
    if (dayCount <= 27) {
      this.setState({
        delay: 2,
        dayCount: dayCount + 1,
      });
    }
  };

  // here we listen to the pre-ovulation button click
  // then we update the inital state and set the day to the 1rst
  handlePreOvulation = () => {
    const { pituitary } = this.props;
    if (pituitary) {
      if (this.intervalHandle) {
        clearInterval(this.intervalHandle);
      }
      this.setState({
        dayCount: 0,
        ovulationActive: false,
        postOvulationActive: false,
        preOvulationActive: true,
      }, () => {
        const preOvulationActive = true;
        const { dispatchPreOvulationState } = this.props;
        dispatchPreOvulationState({ preOvulationActive });
        this.notify();
        // this.tickPreOvulation();
        // this.updateFsh();
        this.intervalHandle = setInterval(this.tickPreOvulation, 4100);
        this.postMessage({
          phase: 'pre-ovulation',
          status: 'started',
        });
      });
    } else {
      Swal.fire({
        title: 'Attention!',
        text: 'La suppression de l\'hypophyse a empêché la sécrétion des hormones ainsi que l\'ovulation.',
        icon: 'warning',
        confirmButtonText: 'Fermer',
        confirmButtonColor: '#5050d2',
      });
    }
  };

  notify = () => toast(<Msg />, { position: toast.POSITION.BOTTOM_LEFT });

  // here we listen to the post-ovulation button click
  // then we update the inital state and set the day to the 14th
  handlePostOvulation = () => {
    const { pituitary } = this.props;
    if (pituitary) {
      const { dispatchDisappearOvule } = this.props;
      dispatchDisappearOvule();
      this.setState({
        dayCount: 15,
        ovulationActive: false,
        postOvulationActive: true,
        preOvulationActive: false,
      });
      const postOvulationActive = true;
      const { dispatchPostOvulationState } = this.props;
      dispatchPostOvulationState({ postOvulationActive });
      this.notify();
      this.intervalHandle = setInterval(this.tickPostOvulation, 4100);
      this.postMessage({
        phase: 'post-ovulation',
        status: 'started',
      });
    } else {
      Swal.fire({
        title: 'Attention!',
        text: 'La suppression de l\'hypophyse a empêché la sécrétion des hormones ainsi que l\'ovulation.',
        icon: 'warning',
        confirmButtonText: 'Fermer',
        confirmButtonColor: '#5050d2',
      });
    }
  };

  // here we listen to the ovulation button click
  // then we update the inital state and set the day to the 12th
  handleOvulation = () => {
    const { pituitary } = this.props;
    if (pituitary) {
      const { dispatchDisappearOvule } = this.props;
      dispatchDisappearOvule();
      this.setState({
        dayCount: 13,
        ovulationActive: true,
        postOvulationActive: false,
        preOvulationActive: false,
      }, () => {
        const ovulationActive = true;
        const { dispatchOvulationState } = this.props;
        dispatchOvulationState({ ovulationActive });
        this.notify();
        this.intervalHandle = setInterval(this.tickOvulation, 2100);
        this.postMessage({
          phase: 'ovulation',
          status: 'started',
        });
      });
    } else {
      Swal.fire({
        title: 'Attention!',
        text: 'La suppression de l\'hypophyse a empêché la sécrétion des hormones ainsi que l\'ovulation.',
        icon: 'warning',
        confirmButtonText: 'Fermer',
        confirmButtonColor: '#5050d2',
      });
    }
  };

  // here we listen to the start button clicked
  // to launch all the ovulation cycle
  handleFullCycle = () => {
    const { pituitary } = this.props;
    if (pituitary) {
      const { dispatchDisappearOvule } = this.props;
      dispatchDisappearOvule();
      this.setState({ isStarted: true, dayCount: 1 });
      this.intervalHandle = setInterval(this.tickFullCycle, 4100);
      this.postMessage({ start_full_cycle: true });
    } else {
      Swal.fire({
        title: 'Attention!',
        text: 'La suppression de l\'hypophyse a empêché la sécrétion des hormones ainsi que l\'ovulation.',
        icon: 'warning',
        confirmButtonText: 'Fermer',
        confirmButtonColor: '#5050d2',
      });
    }
  };

  // here we listen to the stop button clicked
  // to stop all the ovulation cycle
  handleStop = () => {
    this.setState({
      dayCount: 0,
      isStarted: false,
      secreteFsh: false,
      secreteLh: false,
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
      window.postMessage('Error', '*');
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
    distance,
    speed,
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
        // .duration((d, i) => i * 300 + 2000)
        .duration((d, i) => i * distance + speed)
        .attrTween('transform', this.translateAlong(path.node()));
      //  lhElem.on("end", trans); This could be used to make transition infinite
    };
    trans();
  };

  translateAlong = (path) => {
    const l = path.getTotalLength() || 1;
    return () => (t) => {
      const p = path.getPointAtLength(t * l);
      return `translate(${p.x},${p.y})`;
    };
  };

  // this is our crete hormones function that is called right after our app loads
  createHormoneFlow = () => {
    const {
      lhPoints, lhPoints2, fshPoints, fshPoints2, progesteronePoints,
      progesteronePoints2, oestrogenePoints, oestrogenePoints2,
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
      .data([lhPoints2])
      .attr('class', 'lh-hormones2')
      .attr('d', d3.line())
      .attr('fill', 'rgba(124,240,10,0)');
    svg.append('path')
      .data([fshPoints])
      .attr('class', 'fsh-hormones')
      .attr('d', d3.line());
    svg.append('path')
      .data([fshPoints2])
      .attr('class', 'fsh-hormones2')
      .attr('d', d3.line())
      .attr('fill', 'rgba(124,240,10,0)');
    svg.append('path')
      .data([progesteronePoints])
      .attr('class', 'progest-hormones')
      .attr('d', d3.line());
    svg.append('path')
      .data([progesteronePoints2])
      .attr('class', 'progest-hormones2')
      .attr('d', d3.line())
      .attr('fill', 'rgba(124,240,10,0)');
    svg.append('path')
      .data([oestrogenePoints])
      .attr('class', 'oestro-hormones')
      .attr('d', d3.line());
    svg.append('path')
      .data([oestrogenePoints2])
      .attr('class', 'oestro-hormones2')
      .attr('d', d3.line())
      .attr('fill', 'rgba(124,240,10,0)');
    svg.selectAll('.point')
      .data(lhPoints)
      .enter()
      .append('circle')
      .attr('fill', SKY_BLUE)
      .attr('r', 20)
      .attr('transform', d => `translate(${d})`);
    svg.selectAll('.point')
      .data(lhPoints2)
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
      .data(progesteronePoints2)
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
    svg.selectAll('.point')
      .data(oestrogenePoints2)
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
      // secreteLhFsh,
      secreteLh,
      secreteFsh,
      secreteProgest,
      secreteOestro,
      obserViewActive,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Main
          dayCount={dayCount}
          // secreteLhFsh={secreteLhFsh}
          secreteFsh={secreteFsh}
          secreteLh={secreteLh}
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
          // secreteLhFsh={secreteLhFsh}
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
  pituitary: state.simulation.pituitary,
});

const mapDispatchToProps = {
  dispatchPreOvulationState: preOvulationState,
  dispatchOvulationState: ovulationState,
  dispatchPostOvulationState: postOvulationState,
  dispatchAppearOvule: appearOvule,
  dispatchDisappearOvule: disappearOvule,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MainView);

const StyledComponent = withStyles(styles)(ConnectedComponent);

export default StyledComponent;
