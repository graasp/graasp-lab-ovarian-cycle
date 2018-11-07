import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";
import { connect } from 'react-redux';
import Core from './components/Core';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
      delay: 5,
      sec: 0,
      seconds: "00",
      nextColor: 'pink',
      pointsProgest: [
        [378, 1070],
        [414, 1020],
        [415, 930],
        [418, 830],
        [417, 700],
        [413, 470],
        [382, 400],
        [383, 260],
        [383, 200]
      ],
      pointsOestro: [
        [370,1085],
        [414, 1020],
        [415, 930],
        [418, 830],
        [417, 700],
        [413, 470],
        [470, 400],
        [472, 260],
        [470, 200]
      ],
      pointsLh: [
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
        [482,1085]
      ],
      pointsFsh: [
        [395, 210],
        [394, 260],
        [404, 400],
        [448, 470],
        [450, 670],
        [449, 694],
        [437, 750],
        [431, 930],
        [431, 1020],
        [465, 1053]
      ],
    };
    this.handleStart = this.handleStart.bind(this);
    this.tick = this.tick.bind(this);
  };
  tick() {
    let { sec, delay } = this.state;
    let secString = sec + "";
    if (sec === 14 && delay > 0) {
        this.setState({
          delay: delay - 1,
        })
        return;
    }
    if (sec <= 28) {
      console.log('secString.length', secString.length);
      this.setState({
        delay: 5,
        sec: this.state.sec + 1,
        seconds: secString.length === 2 ? " " + secString : "0" + secString,
      });
    }

  }
  handleStart = () => {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      status: !this.state.status,
    });
    // const { pointsLh } =  this.state;
    // pointsLh.push([480, pointsLh[pointsLh.length -1][1] + 20]);
    // this.updateLh(pointsLh);
  }
  handleStop = () => {
    console.log('handleStop clicked');
    this.setState({ seconds: "00", status: false });
    clearInterval(this.intervalHandle);
  }
  updateLh = (data) => {
    console.log('Updating Lh...');
  }
  componentDidMount() {
     this.createHormoneFlow()
  }
  componentDidUpdate() {
     this.createHormoneFlow()
  }

  createHormoneFlow = () => {
    const {
      nextColor, pointsLh, pointsFsh,
      pointsProgest, pointsOestro,
    } = this.state;
    const { svg } = this.props;
    if (!svg) {
      return;
    }
    const pathlh = svg.append("path")
        .data([pointsLh])
        .attr("class", "lh-hormones")
        .attr("d", d3.line()) // Catmull–Rom
    const pathfsh = svg.append("path")
        .data([pointsFsh])
        .attr("class", "fsh-hormones")
        .attr("d", d3.line()) // Catmull–Rom
   const pathprogest = svg.append("path")
       .data([pointsProgest])
       .attr("class", "progests")
       .attr("d", d3.line())
   const pathOestro = svg.append("path")
       .data([pointsOestro])
       .attr("class", "oestros")
       .attr("d", d3.line())
   svg.selectAll(".point")
       .data(pointsLh)
       .enter()
       .append("circle")
       .attr("fill", '#12a3c1')
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
   svg.selectAll(".point")
       .data(pointsFsh)
       .enter()
       .append("circle")
       .attr("fill", '#ff7a00')
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
   svg.selectAll(".point")
       .data(pointsProgest)
       .enter()
       .append("circle")
       .attr("fill", '#9C27B0')
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
   svg.selectAll(".point")
       .data(pointsOestro)
       .enter()
       .append("circle")
       .attr("fill", '#3bc71f')
       .attr("r", 4)
       .attr("transform", function(d) { return "translate(" + d + ")"; });
  }

  render() {
    const { status, seconds } = this.state;
    return (
      <div className="App">
        <Core
          handleStart={this.handleStart}
          handleStop={this.handleStop}
          status={status}
          seconds={seconds}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  svg: state.svg.svg,
});

export default connect(mapStateToProps)(App);
