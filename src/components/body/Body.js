import React from 'react';
import BodyGard from './human-body.png';
import { connect } from 'react-redux';
import { appendSvg } from '../../actions';

class Body extends React.Component {
  componentDidMount() {
    const { dispatchAppendSvg } = this.props;
    dispatchAppendSvg(mapStateToProps);
  }
  render() {
    return (
      <div className="Body-Container">
        <img src={BodyGard} className="Human-image" alt="Logo" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  svg: state.svg
});

const mapDispatchToProps = {
  dispatchAppendSvg: appendSvg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
