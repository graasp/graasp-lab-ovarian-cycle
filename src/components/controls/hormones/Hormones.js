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
        <h2 className={`${preOvulation ? 'animate-text' : ''}`}>
          {preOvulation ? 'Pre-Ovulation' : ''}
        </h2>
        <h2 className={`${ovulation ? 'animate-text' : ''}`}>
          {ovulation ? 'Ovulation' : ''}
        </h2>
        <h2 className={`${postOvulation ? 'animate-text' : ''}`}>
          {postOvulation ? 'Post-Ovulation' : ''}
        </h2>

        <p className="Phase-description">
          {postOvulation ? 'This stage is the moment when the LH and FSH are in very low quatity.' : ''}
          {preOvulation ? 'This stage is the moment when the LH and FSH are in normal quatity.' : ''}
          {ovulation ? 'This stage is the moment when LH and FSH as well as estrogens are in great quantity.' : ''}
        </p>
        <p className="Phase-description">
          {postOvulation ? 'This is the period after ovulation.' : ''}
          {preOvulation ? 'This is the period before ovulation' : ''}
          {ovulation ? 'This is the ovulation phase.' : ''}
        </p>
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
