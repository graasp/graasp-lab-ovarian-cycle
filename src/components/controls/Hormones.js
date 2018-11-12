import React from 'react';

export const Hormones = ({
  secretLhFsh,
  secretProgest,
  secretOestro }) => (
  <div className="Hormone-Container">
    <div className="hormones-container">
      <p>
        <span className="lh-puces">.</span>
        <span className="lh-container">LH</span>
        <span className={`${secretLhFsh ? 'animate-hormones' : ''} lh-state`}>
          {secretLhFsh ? '+' : '-'}
        </span>
      </p>
      <p>
        <span className="fsh-puces">.</span>
        <span className="fsh-container">FSH</span>
        <span className={`${secretLhFsh ? 'animate-hormones' : ''} fsh-state`}>
          {secretLhFsh ? '+' : '-'}
        </span>
      </p>
      <p>
        <span className="oestro-puces">.</span>
        <span className="oestro-container">OESTROGÈNES</span>
        <span className={`${secretOestro ? 'animate-hormones' : ''} oestro-state`}>
          {secretOestro ? '+' : ''}
        </span>
      </p>
      <p>
        <span className="progest-puces">.</span>
        <span className="progest-container">PROGESTÉRONES</span>
        <span className={`${secretProgest ? 'animate-hormones' : ''} progest-state`}>
          {secretProgest ? '+' : ''}
        </span>
      </p>
    </div>
  </div>
);

export default (Hormones);
