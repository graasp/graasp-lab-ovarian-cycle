import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import {
  GREEN,
  ORANGE,
  PURPLE_BLUE,
  SKY_BLUE,
} from '../config/constants';
import Core from '../components/core/Core';
import { AppState } from '../config/AppState';

class StudentView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

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

  // this function handles the reload button to refresh the whole app
  reloadPage = () => {
    window.location.reload();
  }

  // this function handles all the ovarian life cycle events
  // from begening until the cycle ends
  // we use the delay to wait during 5s from the 12 until the 14th day
  tick = () => {
    const {
      dayCount,
      delay,
    } = this.state;
    // eslint-disable-next-line no-unused-vars
    const secString = `${dayCount}`;

    // if in the pre-ovulation phase, we do not secretee lh or fsh
    if (dayCount < 12) {
      this.setState({
        preOvulation: true,
        ovulation: false,
        secreteLhFsh: false,
        postOvulation: false,
      });
      this.updateLh();
    }

    // during the 12-13-14 this is the ovulation period
    if (dayCount >= 12 && dayCount <= 14 && delay > 0) {
      // Update initial state to increase Oestrogen and FSH hormones
      this.updateOestrogen();
      this.updateFsh();
      this.updateLh();
      this.setState({
        delay: delay - 1,
        secreteLhFsh: true,
        secreteOestro: true,
        ovulation: false,
        postOvulation: false,
        preOvulation: true,
      });
      // during the last day of ovulation we secret more fsh,lh and estrogen homones
      // then we stop the preOvulation cycle and update in all components
      if (dayCount === 14) {
        this.setState({
          secreteLhFsh: true,
          secreteOestro: true,
          ovulation: true,
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
        secreteLhFsh: false,
        secreteProgest: true,
        secreteOestro: false,
        ovulation: false,
        postOvulation: true,
        preOvulation: false,
      });
    }

    this.updateTimeState(dayCount, secString);
    // at the end of the cycle we make sure stop all homone secretion
    if (dayCount === 27) {
      this.setState({
        secreteProgest: false,
        secreteOestro: false,
      });
      // then we stop the day counter
      clearInterval(this.intervalHandle);
    }
  }

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
    }
  }

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
    }
  }

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
  }

  // this is our lh updating function
  updateLh = () => {
    // eslint-disable-next-line no-unused-vars
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
  }

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
  }

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
  }

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
  }

  // this is our time tate updater
  updateTimeState = (dayCount) => {
    if (dayCount <= 27) {
      this.setState({
        delay: 5,
        dayCount: dayCount + 1,
      });
    }
  }

  // here we listen to the pre-ovulation button click
  // then we update the inital state and set the day to the 1rst
  handlePreOvulation = () => {
    this.setState({
      dayCount: 1,
      ovulationActive: false,
      postOvulationActive: false,
      preOvulationActive: true,
    });
    this.intervalHandle = setInterval(this.tickPreOvulation, 2100);
  }

  // here we listen to the post-ovulation button click
  // then we update the inital state and set the day to the 14th
  handlePostOvulation = () => {
    this.setState({
      dayCount: 14,
      ovulationActive: false,
      postOvulationActive: true,
      preOvulationActive: false,
    });
    this.intervalHandle = setInterval(this.tickPostOvulation, 2100);
  }

  // here we listen to the ovulation button click
  // then we update the inital state and set the day to the 12th
  handleOvulation = () => {
    this.setState({
      dayCount: 12,
      ovulationActive: true,
      postOvulationActive: false,
      preOvulationActive: false,
    });
    this.intervalHandle = setInterval(this.tickOvulation, 2100);
  }

  // here we listen to the start button clicked
  // to launch all the ovulation cycle
  handleStart = () => {
    this.setState({ isStarted: true });
    this.intervalHandle = setInterval(this.tick, 2100);
  }

  // here we listen to the stop button clicked
  // to stop all the ovulation cycle
  handleStop = () => {
    this.setState({
      dayCount: 0,
      isStarted: false,
    });
    clearInterval(this.intervalHandle);
  }

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
      .attr('r', 8)
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
  }

  translateAlong = (path) => {
    const l = path.getTotalLength();
    return function (d, i, a) {
      return function (t) {
        var p = path.getPointAtLength(t * l);
        return `translate(${  p.x  },${  p.y  })`;
      };
    };
  }

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
      .attr('r', 4)
      .attr('transform', d => `translate(${d})`);
    svg.selectAll('.point')
      .data(fshPoints)
      .enter()
      .append('circle')
      .attr('fill', ORANGE)
      .attr('r', 4)
      .attr('transform', d => `translate(${d})`);
    svg.selectAll('.point')
      .data(progesteronePoints)
      .enter()
      .append('circle')
      .attr('fill', PURPLE_BLUE)
      .attr('r', 4)
      .attr('transform', d => `translate(${d})`);
    svg.selectAll('.point')
      .data(oestrogenePoints)
      .enter()
      .append('circle')
      .attr('fill', GREEN)
      .attr('r', 4)
      .attr('transform', d => `translate(${d})`);
  }

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
    const { t } = this.props;
    return (
      <div className="student-view">
        <Core
          dayCount={dayCount}
          handleOvulation={this.handleOvulation}
          handlePostOvulation={this.handlePostOvulation}
          handlePreOvulation={this.handlePreOvulation}
          reloadPage={this.reloadPage}
          handleStart={this.handleStart}
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
          t={t}
        />
      </div>
    );
  }
}

// we make sure the svg is gotten from our redux state and is mounted
const mapStateToProps = state => ({
  svg: state.svg.svg,
});


export default connect(mapStateToProps)(StudentView);
