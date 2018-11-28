import React from 'react';
import { connect } from 'react-redux';
import HumanBody from './human-body.png';
import { appendSvg } from '../../actions';

export class Body extends React.Component {
  componentDidMount() {
    const { dispatchAppendSvg } = this.props;
    dispatchAppendSvg(mapStateToProps);
  }

  render() {
    return (
      <div className="body-container">
        <img src={HumanBody} className="human-image" alt="Human Body" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  svg: state.svg,
});

const mapDispatchToProps = {
  dispatchAppendSvg: appendSvg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
