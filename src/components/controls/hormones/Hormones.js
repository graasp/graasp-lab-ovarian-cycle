import React from 'react';
import './Hormones.css';

export const Hormones = ({
  ovulation,
  postOvulation,
  preOvulation,
  secretLhFsh,
  secretProgest,
  secretOestro,
 }) => (
  <div className="Hormone-Container">
    <div className="hormones-container">
      <div className="hormones-table">
        <div className="lh-hormones">
          <span className={`${secretLhFsh ? 'animate-lh-hormones' : ''} lh-indicator`}></span>
          <div className={`${secretLhFsh ? 'animate-lh-hormones' : ''} lh-name`}>LH</div>
          <span className={`${secretLhFsh ? 'animate-lh-hormones' : ''} lh-state`}>
            {secretLhFsh ? '+' : '-'}
          </span>
        </div>
        <div className="fsh-hormones">
          <span className={`${secretLhFsh ? 'animate-fsh-hormones' : ''} fsh-indicator`}></span>
          <div className={`${secretLhFsh ? 'animate-fsh-hormones' : ''} fsh-name`}>FSH</div>
          <span className={`${secretLhFsh ? 'animate-fsh-hormones' : ''} fsh-state`}>
            {secretLhFsh ? '+' : '-'}
          </span>
        </div>
        <div className="oestro-hormones">
          <span className={`${secretOestro ? 'animate-oestro-hormones' : ''} oestro-indicator`}></span>
          <div className={`${secretOestro ? 'animate-oestro-hormones' : ''} oestro-name`}>Oestrogens</div>
          <span className={`${secretOestro ? 'animate-oestro-hormones' : ''} oestro-state`}>
            {secretOestro ? '+' : '-'}
          </span>
        </div>
        <div className="progest-hormones">
          <span className={`${secretProgest ? 'animate-progest-hormones' : ''} progest-indicator`}></span>
          <div className={`${secretProgest ? 'animate-progest-hormones' : ''} progest-name`}>Progesterones</div>
          <span className={`${secretProgest ? 'animate-progest-hormones' : ''} progest-state`}>
            {secretProgest ? '+' : '-'}
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
          {postOvulation ? 'Cette etape est le moment ou les LH et FSH sont en très basse quatité.' : ''}
          {preOvulation ? 'Cette etape est le moment ou les LH et FSH sont en quatité normales.' : ''}
          {ovulation ? 'Cette etape est le moment ou les LH et FSH ainsi que les Oestrogènes sont en grande quatité.' : ''}
        </p>
        <p className="Phase-description">
          {postOvulation ? "C'est la periode succédant l'ovulation." : ''}
          {preOvulation ? "C'est la periode precedent l'ovulation." : ''}
          {ovulation ? "C'est la phase de l'ovulation." : ''}
        </p>
      </div>
    </div>
  </div>
);

export default (Hormones);
