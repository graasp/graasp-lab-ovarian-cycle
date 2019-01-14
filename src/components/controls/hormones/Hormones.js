import React from 'react';
import PropTypes from 'prop-types';
import './Hormones.css';
// we make sure check each cycle received from our main component
// and add it related class or set an empty class otherwise
// assuming that all specified classed has their own design
// and we do the same for each phase description
// the t is used for the translation
export const Hormones = ({
  secreteLhFsh,
  secreteProgest,
  secreteOestro,
  t,
}) => (
  <div className="hormone-container">
    <div className="hormones-container">
      <div className="hormones-table">
        <div className="lh-hormones">
          <span className={`${secreteLhFsh ? 'animate-lh-hormones' : ''} lh-indicator`} />
          <div className={`${secreteLhFsh ? 'animate-lh-hormones' : ''} lh-name`}>{t('LH')}</div>
        </div>
        <div className="fsh-hormones">
          <span className={`${secreteLhFsh ? 'animate-fsh-hormones' : ''} fsh-indicator`} />
          <div className={`${secreteLhFsh ? 'animate-fsh-hormones' : ''} fsh-name`}>{t('FSH')}</div>
        </div>
        <div className="oestro-hormones">
          <span className={`${secreteOestro ? 'animate-oestro-hormones' : ''} oestro-indicator`} />
          <div className={`${secreteOestro ? 'animate-oestro-hormones' : ''} oestro-name`}>{t('Oestrogens')}</div>
        </div>
        <div className="progest-hormones">
          <span className={`${secreteProgest ? 'animate-progest-hormones' : ''} progest-indicator`} />
          <div className={`${secreteProgest ? 'animate-progest-hormones' : ''} progest-name`}>{t('Progesterones')}</div>
        </div>
      </div>
    </div>
  </div>
);

Hormones.propTypes = {
  t: PropTypes.func.isRequired,
  secreteLhFsh: PropTypes.bool.isRequired,
  secreteOestro: PropTypes.bool.isRequired,
  secreteProgest: PropTypes.bool.isRequired,
};

export default (Hormones);
