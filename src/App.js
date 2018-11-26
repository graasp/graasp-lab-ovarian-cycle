import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import {
  GREEN,
  ORANGE,
  PURPLE_BLUE,
  SKY_BLUE,
} from './config/constants';
import { AppState } from './config/AppState';
import Core from './components/Core';

class App extends Component {
  state = AppState;

  componentDidMount() {
    this.createHormoneFlow();
  }

  componentDidUpdate(prevProps) {
    const { svg } = prevProps;
    if (!svg) {
      this.createHormoneFlow();
    }
  }

  reloadPage = () => {
    window.location.reload();
  }

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

    // during the xxx this is the ovulation period
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
      // during the last day of ovulation ...
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
      this.setState({
        secreteProgest: false,
        secreteOestro: false,
      });
      clearInterval(this.intervalHandle);
    }
  }

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

  tickOvulation = () => {
    const {
      dayCount,
      delay,
    } = this.state;
    const secString = `${dayCount}`;

    if (dayCount >= 12 && dayCount <= 14 && delay > 0) {
    // Update initial state to increase Oestrogen and FSH hormones
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

  updateFsh = () => {
    const { svg } = this.props;
    const { fshPoints } = this.state;
    let nextColor = SKY_BLUE;
    const translate = `translate(${fshPoints[0]})`;
    this.updateHormone({
      data: fshPoints,
      elemClass: 'fsss',
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

  updateTimeState = (dayCount) => {
    if (dayCount <= 27) {
      this.setState({
        delay: 5,
        dayCount: dayCount + 1,
      });
    }
  }

  handlePreOvulation = () => {
    this.setState({
      dayCount: 1,
      ovulationActive: false,
      postOvulationActive: false,
      preOvulationActive: true,
    });
    this.intervalHandle = setInterval(this.tickPreOvulation, 2100);
  }

  handlePostOvulation = () => {
    this.setState({
      dayCount: 14,
      ovulationActive: false,
      postOvulationActive: true,
      preOvulationActive: false,
    });
    this.intervalHandle = setInterval(this.tickPostOvulation, 2100);
  }

  handleOvulation = () => {
    this.setState({
      dayCount: 12,
      ovulationActive: true,
      postOvulationActive: false,
      preOvulationActive: false,
    });
    this.intervalHandle = setInterval(this.tickOvulation, 2100);
  }

  handleStart = () => {
    this.setState({ isStarted: true });
    this.intervalHandle = setInterval(this.tick, 2100);
  }

  handleStop = () => {
    this.setState({
      dayCount: 0,
      isStarted: false,
    });
    clearInterval(this.intervalHandle);
  }

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
    } = this.state;
    return (
      <div className="App">
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  svg: state.svg.svg,
});

export default connect(mapStateToProps)(App);
