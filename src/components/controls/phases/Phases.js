import React from 'react';
import './Phases.css';
import { Button } from 'reactstrap';

export const Phases = ({ seconds }) => (
  <div className="Phases-Container">
    <div className="phases-title">
      <span className="select-step"> Select step... </span>
    </div>
    <div className="phases">
      <Button outline color="secondary" className='pre-ovulation' >Pre-Ovulation</Button>
      <Button outline color="secondary" className='mx-2 ovulation' >Ovulation</Button>
      <Button outline color="secondary" className='post-ovulation' >Post-Ovulation</Button>
    </div>
  </div>
);

export default (Phases);
