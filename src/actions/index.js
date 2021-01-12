import * as d3 from 'd3';
import {
  APPEND_SVG,
  PRE_OVULATION,
  OVULATION,
  POST_OVULATION,
  APPEAR_OVULE,
  DISAPPEAR_OVULE,
  DELETE_OVARIES,
  DELETE_PITUITARY,
} from '../types';

export function appendSvg() {
  // creating our initial svg that we append to the
  // tag having the body-container class in our app

  const svg = d3.select('.Brain-holder');
  return {
    type: APPEND_SVG,
    payload: svg,
  };
}

export function preOvulationState({ preOvulationActive, preOvulationStep }) {
  return {
    type: PRE_OVULATION,
    payload: { preOvulationActive, preOvulationStep },
  };
}

export function ovulationState({ ovulationActive, ovulationStep }) {
  return {
    type: OVULATION,
    payload: { ovulationActive, ovulationStep },
  };
}

export function postOvulationState({ postOvulationActive, postOvulationStep }) {
  return {
    type: POST_OVULATION,
    payload: { postOvulationActive, postOvulationStep },
  };
}

export function appearOvule() {
  return {
    type: APPEAR_OVULE,
  };
}
export function disappearOvule() {
  return {
    type: DISAPPEAR_OVULE,
  };
}
export function deleteOvaries() {
  return {
    type: DELETE_OVARIES,
  };
}
export function deletePituitary() {
  return {
    type: DELETE_PITUITARY,
  };
}
export * from './context';
export * from './appInstance';
export * from './users';
export * from './layout';
