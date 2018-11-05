import React from 'react';

export const Hormones = ({ d3 }) => (
  <div className="Hormone-Container">
    <div className="hormones-container">
      <p>
        <span className="fsh-puces">.</span>
        <span className="fsh-container">FSH</span>
        <span className="fsh-state">+</span>
      </p>
      <p>
        <span className="lh-puces">.</span>
        <span className="lh-container">LH</span>
        <span className="lh-state">+</span>
      </p>
      <p>
        <span className="oestro-puces">.</span>
        <span className="oestro-container">OESTROGÈNES</span>
        <span className="oestro-state">-</span>
      </p>
      <p>
        <span className="progest-puces">.</span>
        <span className="progest-container">PROGESTÉRONES</span>
        <span className="progest-state">-</span>
      </p>
    </div>
  </div>
);

export default (Hormones);
