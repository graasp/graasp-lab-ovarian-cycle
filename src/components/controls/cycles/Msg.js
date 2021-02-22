import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const Msg = ({
  preOvulationActive,
  themeColor,
  ovulationActive,
  postOvulationActive,
  preOvulationStep,
  ovulationStep,
  postOvulationStep,
  ovaries,
  t,
}) => (
  <div>
    { preOvulationActive || preOvulationStep ? (
      <div>
        <h4 className="animate-text" style={{ color: themeColor }}>
          {t('Pre-Ovulation')}
        </h4>
        <p className="explanation">
          {t('This stage is the moment when the LH and FSH as well as estrogens are in normal quantity.')}
          <br />
          {t('This is the period before ovulation')}
        </p>
      </div>
    ) : ''
      }
    { ovulationActive || ovulationStep ? (
      <div>
        <h4 className="animate-text" style={{ color: themeColor }}>
          {t('Ovulation')}
        </h4>
        <p className="explanation">
          {t('During this stage, a high level of estrogen triggers a high production of LH. We have also released the egg.')}
          <br />
          {t('This is the ovulation phase.')}
        </p>
      </div>
    ) : ''
      }
    { postOvulationActive || postOvulationStep ? (
      <div>
        <h4 className="animate-text" style={{ color: themeColor }}>
          {t('Post-Ovulation')}
        </h4>
        <p className="explanation">
          {t('This stage is the moment when the LH is in very low quatity, but Estrogens and Progesterones are in great quantity.')}
          <br />
          {t('This is the period after ovulation.')}
        </p>
      </div>
    ) : ''
      }
    { !ovaries ? (
      <div>
        <h4 className="animate-text" style={{ color: themeColor }}>
            Ovaires supprimées
        </h4>
        <p className="explanation">
            Les deux ovaires ont été supprimées!
          <br />
        </p>
      </div>
    ) : ''
      }
  </div>
);

const mapStateToProps = state => ({
  preOvulationActive: state.simulation.preOvulationActive,
  postOvulationActive: state.simulation.postOvulationActive,
  ovaries: state.simulation.ovaries,
  ovulationActive: state.simulation.ovulationActive,
  preOvulationStep: state.simulation.preOvulationStep,
  ovulationStep: state.simulation.ovulationStep,
  postOvulationStep: state.simulation.postOvulationStep,
  themeColor: state.layout.themeColor,
});

Msg.propTypes = {
  themeColor: PropTypes.string.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationStep: PropTypes.bool.isRequired,
  ovulationStep: PropTypes.bool.isRequired,
  ovaries: PropTypes.bool.isRequired,
  postOvulationStep: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('translations')(connect(mapStateToProps)(Msg));
