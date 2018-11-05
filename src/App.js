import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";
import Core from './components/Core';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
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
  };
  daySetter = (val) => {
    const valString = val + "";
    if(valString.length < 2) {
     return "0" + valString;
    } else {
     return valString;
    }
  }

  set_timer() {
    const secondsLabel = document.querySelector(".clock-counter");
    const my_int = setInterval(function() { this.setTime(secondsLabel)}, 1000);
  }

  setTime = (secs) => {

    this.setState({
      seconds: ++this.state.seconds,
    })
    if (this.state.seconds <= 29) {
      secs.innerHTML = this.daySetter(this.state.seconds%29);
    }
  }
  handleStart = () => {
    console.log('handleStart clicked');
    const { pointsLh } =  this.state;
    pointsLh.push([480, pointsLh[pointsLh.length -1][1] + 20]);
    this.updateLh();
    console.log('updateLh', pointsLh);
  }
  handleStop = () => {
    console.log('handleStop clicked');
  }
  updateLh = (data) => {
    console.log('updating Lh...');
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
    const svg = d3.select(".Body-Container").append("svg")
        .attr("width", 700)
        .attr("height", 1500);
    const path = svg.append("path")
        .data([pointsLh])
        .attr("class", "fsh-hormones")
        .attr("d", d3.line()) // Catmull–Rom
    const pathfsh = svg.append("path")
        .data([pointsFsh])
        .attr("class", "fsh")
        .attr("d", d3.line()) // Catmull–Rom
   const pathlh = svg.append("path")
       .data([pointsProgest])
       .attr("class", "lh-hormones")
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
    return (
      <div className="App">
        <Core d3={d3}
          handleStart={this.handleStart}
          handleStop={this.handleStop}
        />
      </div>
    );
  }
}

export default App;
