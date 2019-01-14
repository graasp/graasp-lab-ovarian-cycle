import React from 'react';
import PropTypes from 'prop-types';
// we make sure all other buttons are disabled when one is clicked
export const Cycles = ({
  preOvulation,
  ovulation,
  postOvulation,
  t,
}) => (
  <div className="cycles-container">
    <div className="description-container">
      {preOvulation ? (
        <h1 className={`${preOvulation ? 'animate-text' : ''}`}>
          {t('Pre-Ovulation')}
        </h1>
      ) : ''
      }
      {ovulation ? (
        <h1 className={`${ovulation ? 'animate-text' : ''}`}>
          {t('Ovulation')}
        </h1>
      ) : ''
      }
      {postOvulation ? (
        <h1 className={`${postOvulation ? 'animate-text' : ''}`}>
          {t('Post-Ovulation')}
        </h1>
      ) : ''
      }
      {preOvulation ? (
        <p className="preovulation-description">
          {t('This stage is the moment when the LH and FSH are in normal quatity.')}
          <br />
          {t('This is the period before ovulation')}
        </p>
      ) : ''
      }
      {ovulation ? (
        <p className="ovulation-description">
          {t('This stage is the moment when LH and FSH as well as estrogens are in great quantity.')}
          <br />
          {t('This is the ovulation phase.')}
        </p>
      ) : ''
      }
      {postOvulation ? (
        <p className="postovulation-description">
          {t('This stage is the moment when the LH and FSH are in very low quatity.')}
          <br />
          {t('This is the period after ovulation.')}
        </p>
      ) : ''
      }
    </div>
  </div>
);

Cycles.propTypes = {
  t: PropTypes.func.isRequired,
  ovulation: PropTypes.bool.isRequired,
  preOvulation: PropTypes.bool.isRequired,
  postOvulation: PropTypes.bool.isRequired,
};

export default (Cycles);
