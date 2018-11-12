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

  handleStart = () => {
    const { pointsLh } =  this.state;
    pointsLh.push([480, pointsLh[pointsLh.length -1][1] + 20]);
    this.updateLh(pointsLh);
  }
  handleStop = () => {
    console.log('handleStop clicked');
  }
  updateLh = (data) => {
    const { svg } = this.props;
    const { pointsLh } = this.state;
    let nextColor = '#ff7a00'
    const path = svg.selectAll(".lh-hormones")
    const lhElem = svg.selectAll(".ted").data( data, (d, i) => i );
    lhElem
      .enter()
      .append("circle")
      .attr('class', 'ted')
      .attr("r", 8)
      .attr("fill", () => {
        nextColor = nextColor === '#12a3c1' ? '#ff7a00' : '#12a3c1';
        return nextColor;
      }).attr("transform", "translate(" + pointsLh[0] + ")");

    const trans = () => {
      lhElem
        .transition()
        .duration((d, i) => { return i * 300 + 5000; })
        .attrTween("transform", this.translateAlong(path.node()))
        .on("end", trans);
    }
    trans();
  }
  translateAlong = (path) => {
    console.log('translateAlong');
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
    const pathLh = svg.append("path")
        .data([pointsLh])
        .attr("class", "lh-hormones")
        .attr("d", d3.line()) // Catmull–Rom
    const pathFsh = svg.append("path")
        .data([pointsFsh])
        .attr("class", "fsh-hormones")
        .attr("d", d3.line()) // Catmull–Rom
   const pathProgest = svg.append("path")
       .data([pointsProgest])
       .attr("class", "progest-hormones")
       .attr("d", d3.line())
   const pathOestro = svg.append("path")
       .data([pointsOestro])
       .attr("class", "oestro-hormones")
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
        <Core
          handleStart={this.handleStart}
          handleStop={this.handleStop}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  svg: state.svg.svg,
});

export default connect(mapStateToProps)(App);
