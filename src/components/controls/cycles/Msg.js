import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Msg = ({
  preOvulationActive,
  themeColor,
  ovulationActive,
  postOvulationActive,
}) => (
  <div>
    { preOvulationActive ? (
      <div>
        <h4 className="animate-text" style={{ color: themeColor }}>
          Pre-Ovulation
        </h4>
        <p className="">
          This stage is the moment when the LH and FSH are in normal quatity.
          <br />
          This is the period before ovulation
        </p>
      </div>
    ) : ''
    }
    { ovulationActive ? (
      <div>
        <h4 className="animate-text" style={{ color: themeColor }}>
          Ovulation
        </h4>
        <p className="">
          This stage is the moment when LH and FSH as well as estrogens are in great quantity.
          <br />
          This is the ovulation phase.
        </p>
      </div>
    ) : ''
    }
    { postOvulationActive ? (
      <div>
        <h4 className="animate-text" style={{ color: themeColor }}>
          Post-Ovulation
        </h4>
        <p className="">
          This stage is the moment when the LH and FSH are in very low quatity.
          <br />
          This is the period after ovulation.
        </p>
      </div>
    ) : ''
    }
  </div>
);

const mapStateToProps = state => ({
  preOvulationActive: state.setting.preOvulationActive,
  postOvulationActive: state.setting.postOvulationActive,
  ovulationActive: state.setting.ovulationActive,
  themeColor: state.setting.themeColor,
});

Msg.propTypes = {
  themeColor: PropTypes.string.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Msg);
