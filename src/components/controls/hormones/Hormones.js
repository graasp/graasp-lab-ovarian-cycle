import React from 'react';
import PropTypes from 'prop-types';
import './Hormones.css';

export const Hormones = ({
  ovulation,
  postOvulation,
  preOvulation,
  secreteLhFsh,
  secreteProgest,
  secreteOestro,
}) => (
  <div className="Hormone-Container">
    <div className="hormones-container">
      <div className="hormones-table">
        <div className="lh-hormones">
          <span className={`${secreteLhFsh ? 'animate-lh-hormones' : ''} lh-indicator`} />
          <div className={`${secreteLhFsh ? 'animate-lh-hormones' : ''} lh-name`}>LH</div>
          <span className={`${secreteLhFsh ? 'animate-lh-hormones' : ''} lh-state`}>
            {secreteLhFsh ? '+' : '-'}
          </span>
        </div>
        <div className="fsh-hormones">
          <span className={`${secreteLhFsh ? 'animate-fsh-hormones' : ''} fsh-indicator`} />
          <div className={`${secreteLhFsh ? 'animate-fsh-hormones' : ''} fsh-name`}>FSH</div>
          <span className={`${secreteLhFsh ? 'animate-fsh-hormones' : ''} fsh-state`}>
            {secreteLhFsh ? '+' : '-'}
          </span>
        </div>
        <div className="oestro-hormones">
          <span className={`${secreteOestro ? 'animate-oestro-hormones' : ''} oestro-indicator`} />
          <div className={`${secreteOestro ? 'animate-oestro-hormones' : ''} oestro-name`}>Oestrogens</div>
          <span className={`${secreteOestro ? 'animate-oestro-hormones' : ''} oestro-state`}>
            {secreteOestro ? '+' : '-'}
          </span>
        </div>
        <div className="progest-hormones">
          <span className={`${secreteProgest ? 'animate-progest-hormones' : ''} progest-indicator`} />
          <div className={`${secreteProgest ? 'animate-progest-hormones' : ''} progest-name`}>Progesterones</div>
          <span className={`${secreteProgest ? 'animate-progest-hormones' : ''} progest-state`}>
            {secreteProgest ? '+' : '-'}
          </span>
        </div>
      </div>
      <div className="description-container">
        <h1 className={`${preOvulation ? 'animate-text' : ''}`}>
          {preOvulation ? 'Pre-Ovulation' : ''}
        </h1>
        <h1 className={`${ovulation ? 'animate-text' : ''}`}>
          {ovulation ? 'Ovulation' : ''}
        </h1>
        <h1 className={`${postOvulation ? 'animate-text' : ''}`}>
          {postOvulation ? 'Post-Ovulation' : ''}
        </h1>

        {preOvulation ? (
          <p className="preovulation-description">
            This stage is the moment when the LH and FSH are in normal quatity.
            <br />
            This is the period before ovulation
          </p>
        ) : ''
        }
        {ovulation ? (
          <p className="ovulation-description">
            This stage is the moment when LH and FSH as well as estrogens are in great quantity.
            <br />
            This is the ovulation phase.
          </p>
        ) : ''
        }
        {postOvulation ? (
          <p className="postovulation-description">
            This stage is the moment when the LH and FSH are in very low quatity.
            <br />
            This is the period after ovulation.
          </p>
        ) : ''
        }
      </div>
    </div>
  </div>
);

Hormones.propTypes = {
  ovulation: PropTypes.bool.isRequired,
  postOvulation: PropTypes.bool.isRequired,
  preOvulation: PropTypes.bool.isRequired,
  secreteLhFsh: PropTypes.bool.isRequired,
  secreteOestro: PropTypes.bool.isRequired,
  secreteProgest: PropTypes.bool.isRequired,
};

export default (Hormones);
