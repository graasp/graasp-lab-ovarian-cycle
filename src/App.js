import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";
import { connect } from 'react-redux';
import {
  COMMON_DOTS,
  COMMON_DOTS_1,
  COMMON_DOTS_2,
  COMMON_DOTS_3,
  COMMON_DOTS_4,
  MAX_LH,
  GREEN,
  ORANGE,
  PURPLE_BLUE,
  SKY_BLUE,
} from './config/constants';
import Core from './components/Core';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postOvulation: false,
      preOvulation: true,
      ovulation: false,
      ovulationActive: false,
      postOvulationActive: false,
      preOvulationActive: false,
      // we delay five seconds during the 13 and 14 days
      delay: 5,
      dayCount: 1,
      secretLhFsh: false,
      secretProgest: false,
      secretOestro: false,
      isStarted: false,
      // starting state for the progesterone dots
      progesteronePoints: [
        [378, 1070],
        COMMON_DOTS,
        COMMON_DOTS_1,
        COMMON_DOTS_2,
        COMMON_DOTS_3,
        COMMON_DOTS_4,
        [382, 400],
        [383, 260],
        [383, 200],
      ],
      oestrogenePoints: [
        [370, MAX_LH],
        COMMON_DOTS,
        COMMON_DOTS_1,
        COMMON_DOTS_2,
        COMMON_DOTS_3,
        COMMON_DOTS_4,
        [470, 400],
        [472, 260],
        [470, 200],
      ],
      lhPoints: [
        [458, 200],
        [458, 260],
        [448, 400],
        [448, 470],
        [450, 670],
        [449, 694],
        [437, 750],
        [431, 930],
        [431, 1020],
        [485, 1070],
        [482, MAX_LH],
      ],
      fshPoints: [
        [395, 210],
        [394, 260],
        [404, 400],
        [448, 470],
        [450, 670],
        [449, 694],
        [437, 750],
        [431, 930],
        [431, 1020],
        [370, MAX_LH],
      ],
    };
  };
  tick = () => {
    let {
      dayCount,
      delay,
    } = this.state;
    let secString = dayCount + "";

    // if in the pre-ovulation phase, we do not secrete lh or fsh
    if (dayCount < 12 ) {
      this.setState({
        preOvulation: true,
        ovulation: false,
        secretLhFsh: false,
        postOvulation: false,
      })
      this.updateLh();
    }

    // during the xxx this is the ovulation period
    if (dayCount >= 12 && dayCount <= 14 && delay > 0) {
        // Update initial state to increase Oestrogen and FSH hormones
        this.updateOestrogen();
        this.updateFsh();
        this.updateLh();
        this.setState({
          delay: delay - 1,
          secretLhFsh: true,
          secretOestro: true,
          ovulation: false,
          postOvulation: false,
          preOvulation: true,
        });
        // during the last day of ovulation ...
        if (dayCount === 14) {
          this.setState({
            secretLhFsh: true,
            secretOestro: true,
            ovulation: true,
            preOvulation: false,
          });
        }
        return;
    }
    if (dayCount >= 15) {
    // Update initial state to increase progesterones hormones
      this.updateProgesteron();
      this.setState({
        secretLhFsh: false,
        secretProgest: true,
        secretOestro: false,
        ovulation: false,
        postOvulation: true,
        preOvulation: false,
      })
    }

    this.updateTimeState(dayCount, secString);

    if (dayCount === 27) {
      this.setState({
        secretProgest: false,
        secretOestro: false,
      })
      clearInterval(this.intervalHandle);
    }
  }
  tickPreOvulation = () => {
    let { dayCount } = this.state;
    let secString = dayCount + "";

    if (dayCount < 12 ) {
      this.setState({
        preOvulation: true,
        ovulation: false,
        secretLhFsh: false,
        postOvulation: false,
      })
      this.updateLh();
    }
    this.updateTimeState(dayCount, secString);

    if (dayCount === 11) {
      clearInterval(this.intervalHandle);
    }
  }
  tickPostOvulation = () => {
    let { dayCount } = this.state;
    let secString = dayCount + "";

    if (dayCount >= 15) {
    // Update initial state to increase progesterones hormones
      this.updateProgesteron();
      this.setState({
        secretLhFsh: false,
        secretProgest: true,
        secretOestro: false,
        ovulation: false,
        postOvulation: true,
        preOvulation: false,
      })
    }

    this.updateTimeState(dayCount, secString);

    if (dayCount === 27) {
      this.setState({
        secretProgest: false,
        secretOestro: false,
      })
      clearInterval(this.intervalHandle);
    }
  }
  tickOvulation = () => {
    let {
      dayCount,
      delay,
    } = this.state;
    let secString = dayCount + "";

    if (dayCount >= 12 && dayCount <= 14 && delay > 0) {
    // Update initial state to increase Oestrogen and FSH hormones
        this.updateOestrogen();
        this.updateFsh();
        this.updateLh();
        this.setState({
          delay: delay - 1,
          secretLhFsh: true,
          secretOestro: true,
          ovulation: false,
          postOvulation: false,
          preOvulation: true,
        });
        if (dayCount === 14) {
          this.setState({
            secretLhFsh: true,
            secretOestro: true,
            ovulation: true,
            preOvulation: false,
          });
        }
        return;
    }

    this.updateTimeState(dayCount, secString);

    if (dayCount === 14) {
      clearInterval(this.intervalHandle);
    }
  }

  updateLh = () => {
    const { svg } = this.props;
    const { lhPoints } =  this.state;
    let nextColor = SKY_BLUE;
    this.updateHormone({
      data: lhPoints,
      elemClass: 'ted',
      hormClass: '.lh-hormones',
      circleFill: () => { nextColor = nextColor === SKY_BLUE ? ORANGE : SKY_BLUE; return nextColor; },
      circleTransform: "translate(" + lhPoints[0] + ")",
      path: svg.selectAll('.lh-hormones'),
    });
  }
  updateFsh = () => {
    const { svg } = this.props;
    const { fshPoints } =  this.state;
    let nextColor = SKY_BLUE;
    this.updateHormone({
      data: fshPoints,
      elemClass: 'fsss',
      hormClass: '.fsh-hormones',
      circleFill: () => { nextColor = nextColor === SKY_BLUE ? ORANGE : SKY_BLUE; return nextColor; },
      circleTransform: "translate(" + fshPoints[0] + ")",
      path: svg.selectAll('.fsh-hormones'),
    });
  }
  updateOestrogen = () => {
    const { svg } = this.props;
    const { oestrogenePoints } = this.state;
    this.updateHormone({
      data: oestrogenePoints,
      elemClass: 'oestros',
      hormClass: '.oestro-hormones',
      circleFill: GREEN,
      circleTransform: "translate(" + oestrogenePoints[8] + ")",
      path: svg.selectAll('.oestro-hormones'),
    });
  }
  updateProgesteron = () => {
    const { svg } = this.props;
    const { progesteronePoints } = this.state;
    this.updateHormone({
      data: progesteronePoints,
      elemClass: 'progests',
      hormClass: '.progest-hormones',
      circleFill: PURPLE_BLUE,
      circleTransform: "translate(" + progesteronePoints[8] + ")",
      path: svg.selectAll('.progest-hormones'),
    });
  }
  updateTimeState = (dayCount, secString) => {
    if (dayCount <= 27) {
      this.setState({
        delay: 5,
        dayCount: this.state.dayCount + 1,
      });
    }
  }
  handlePreOvulation = () => {
    this.setState({
      dayCount: 1,
      ovulationActive: false,
      postOvulationActive: false,
      preOvulationActive: true,
    })
    this.intervalHandle = setInterval(this.tickPreOvulation, 2100);
  }
  handlePostOvulation = () => {
    this.setState({
      dayCount: 14,
      ovulationActive: false,
      postOvulationActive: true,
      preOvulationActive: false,
    })
    this.intervalHandle = setInterval(this.tickPostOvulation, 2100);
  }
  handleOvulation = () => {
    this.setState({
      dayCount: 12,
      ovulationActive: true,
      postOvulationActive: false,
      preOvulationActive: false,
    })
    this.intervalHandle = setInterval(this.tickOvulation, 2100);
  }
  handleStart = () => {
    this.setState({ isStarted: true })
    this.intervalHandle = setInterval(this.tick, 2100);
  }
  handleStop = () => {
    this.setState({
      dayCount: 0,
      isStarted: false,
      status: false,
    });
    clearInterval(this.intervalHandle);
  }
  updateHormone = ({data, elemClass, hormClass, circleFill, circleTransform, path}) => {
    const { svg } = this.props;
    const lhElem = svg.selectAll(`.${elemClass}`).data( data, (d, i) => i );
    lhElem
      .enter()
      .append("circle")
      .attr('class', elemClass)
      .attr("r", 8)
      .attr("fill", circleFill).attr("transform", circleTransform);

    const trans = () => {
      lhElem
        .transition()
        .duration((d, i) => { return i * 300 + 2000; })
        .attrTween("transform", this.translateAlong(path.node()))
      //  lhElem.on("end", trans); This could be used to make transition infinite
    }
    trans();
  }
  translateAlong = (path) => {
    var l = path.getTotalLength();
    return function(d, i, a) {
      return function(t) {
        var p = path.getPointAtLength(t * l);
        return "translate(" + p.x + "," + p.y + ")";
      };
    };
  }
  componentDidMount() {
    this.createHormoneFlow()
  }
  componentDidUpdate(prevProps) {
    const { svg } = prevProps;
    if (!svg) {
      this.createHormoneFlow();
    }
  }
  createHormoneFlow = () => {
    const {
      lhPoints, fshPoints,
      progesteronePoints, oestrogenePoints,
    } = this.state;
    const { svg } = this.props;
    if (!svg) {
      return;
    }
    svg.append("path")
        .data([lhPoints])
        .attr("class", "lh-hormones")
        .attr("d", d3.line()) // Catmull–Rom
    svg.append("path")
        .data([fshPoints])
        .attr("class", "fsh-hormones")
        .attr("d", d3.line()) // Catmull–Rom
   svg.append("path")
       .data([progesteronePoints])
       .attr("class", "progest-hormones")
       .attr("d", d3.line())
   svg.append("path")
       .data([oestrogenePoints])
       .attr("class", "oestro-hormones")
       .attr("d", d3.line())
   svg.selectAll(".point")
       .data(lhPoints)
       .enter()
       .append("circle")
       .attr("fill", SKY_BLUE)
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
   svg.selectAll(".point")
       .data(fshPoints)
       .enter()
       .append("circle")
       .attr("fill", ORANGE)
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
   svg.selectAll(".point")
       .data(progesteronePoints)
       .enter()
       .append("circle")
       .attr("fill", PURPLE_BLUE)
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
   svg.selectAll(".point")
       .data(oestrogenePoints)
       .enter()
       .append("circle")
       .attr("fill", GREEN)
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
  }

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
      secretLhFsh,
      secretProgest,
      secretOestro,
    } = this.state;
    return (
      <div className="App">
        <Core
          dayCount={dayCount}
          handleOvulation={this.handleOvulation}
          handlePostOvulation={this.handlePostOvulation}
          handlePreOvulation={this.handlePreOvulation}
          handleStart={this.handleStart}
          handleStop={this.handleStop}
          isStarted={isStarted}
          ovulation={ovulation}
          ovulationActive={ovulationActive}
          preOvulationActive={preOvulationActive}
          postOvulationActive={postOvulationActive}
          postOvulation={postOvulation}
          preOvulation={preOvulation}
          secretLhFsh={secretLhFsh}
          secretProgest={secretProgest}
          secretOestro={secretOestro}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  svg: state.svg.svg,
});

export default connect(mapStateToProps)(App);
