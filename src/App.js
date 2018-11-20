import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";
import { connect } from 'react-redux';
import Core from './components/Core';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextColor: 'pink',
      dayNum: 0,
      delay: 5,
      sec: 0,
      seconds: "00",
      secretLhFsh: false,
      secretProgest: false,
      secretOestro: false,
      progesteronePoints: [
        [378, 1070],
        [414, 1020],
        [415, 930],
        [418, 830],
        [417, 700],
        [413, 470],
        [382, 400],
        [383, 260],
        [383, 200],
      ],
      oestrogenePoints: [
        [370,1085],
        [414, 1020],
        [415, 930],
        [418, 830],
        [417, 700],
        [413, 470],
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
        [485,1070],
        [482,1085],
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
        [370, 1085],
      ],
    };
  };
  tick = () => {
    let { sec, delay } = this.state;
    let secString = sec + "";

    if (sec <= 12 ) {
      this.setState({
        secretLhFsh: false,
        dayNum: sec,
      })
      this.updateLh();
    }
    if ((sec === 13 && delay > 0) || (sec === 14 && delay > 0)) {
    // Update initial state to increase Oestrogen and FSH hormones
        this.updateOestrogen();
        this.updateFsh();
        this.updateLh()
        this.setState({
          delay: delay - 1,
          secretLhFsh: true,
          secretOestro: true,
          dayNum: sec,
        })
        return;
    }
    if (sec >= 15) {
    // Update initial state to increase progesterones hormones
      this.updateProgesteron();
      this.setState({
        secretLhFsh: false,
        secretProgest: true,
        secretOestro: false,
        dayNum: sec,
      })
    }

    if (sec >= 28) {
      this.setState({
        secretProgest: false,
        secretOestro: false,
        dayNum: sec,
      })
    }

    this.updateTimeState(sec, secString);

    if (sec === 28) {
      clearInterval(this.intervalHandle);
    }
  }

  updateLh = () => {
    const { svg } = this.props;
    const { lhPoints, dayNum } =  this.state;
    let nextColor = '#12a3c1';
    this.updateHormone({
      data: lhPoints,
      elemClass: 'ted',
      hormClass: '.lh-hormones',
      circleFill: () => { nextColor = nextColor === '#12a3c1' ? '#ff7a00' : '#12a3c1'; return nextColor; },
      circleTransform: "translate(" + lhPoints[0] + ")",
      path: svg.selectAll('.lh-hormones'),
      day: dayNum,
    });
  }
  updateFsh = () => {
    const { svg } = this.props;
    const { fshPoints, dayNum } =  this.state;
    let nextColor = '#12a3c1';
    this.updateHormone({
      data: fshPoints,
      elemClass: 'fsss',
      hormClass: '.fsh-hormones',
      circleFill: () => { nextColor = nextColor === '#12a3c1' ? '#ff7a00' : '#12a3c1'; return nextColor; },
      circleTransform: "translate(" + fshPoints[0] + ")",
      path: svg.selectAll('.fsh-hormones'),
      day: dayNum,
    });
  }
  updateOestrogen = () => {
    const { svg } = this.props;
      const { oestrogenePoints, dayNum } = this.state;
      this.updateHormone({
        data: oestrogenePoints,
        elemClass: 'oestros',
        hormClass: '.oestro-hormones',
        circleFill: '#3bc71f',
        circleTransform: "translate(" + oestrogenePoints[8] + ")",
        path: svg.selectAll('.oestro-hormones'),
        day: dayNum,
      });
  }
  updateProgesteron = () => {
    const { svg } = this.props;
    const { progesteronePoints, dayNum } = this.state;
    this.updateHormone({
      data: progesteronePoints,
      elemClass: 'progests',
      hormClass: '.progest-hormones',
      circleFill: '#9C27B0',
      circleTransform: "translate(" + progesteronePoints[8] + ")",
      path: svg.selectAll('.progest-hormones'),
      day: dayNum,
    });
  }
  updateTimeState = (sec, secString) => {
    if (sec <= 28) {
      this.setState({
        delay: 5,
        sec: this.state.sec + 1,
        seconds: secString.length === 2 ? " " + secString : "0" + secString,
      });
    }
  }
  handleStart = () => {
    this.intervalHandle = setInterval(this.tick, 2100);
  }
  handleStop = () => {
    this.setState({
      sec: 0,
      seconds: "00",
      status: false,
    });
    clearInterval(this.intervalHandle);
  }
  updateHormone = ({data, day, elemClass, hormClass, circleFill, circleTransform, path}) => {
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
    console.log('createHormoneFlow');
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
       .attr("fill", '#12a3c1')
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
   svg.selectAll(".point")
       .data(fshPoints)
       .enter()
       .append("circle")
       .attr("fill", '#ff7a00')
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
   svg.selectAll(".point")
       .data(progesteronePoints)
       .enter()
       .append("circle")
       .attr("fill", '#9C27B0')
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
   svg.selectAll(".point")
       .data(oestrogenePoints)
       .enter()
       .append("circle")
       .attr("fill", '#3bc71f')
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
  }

  render() {
    const { seconds, secretLhFsh, secretProgest, secretOestro } = this.state;
    return (
      <div className="App">
        <Core
          handleStart={this.handleStart}
          handleStop={this.handleStop}
          seconds={seconds}
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
