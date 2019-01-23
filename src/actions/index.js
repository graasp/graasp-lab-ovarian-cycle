import * as d3 from 'd3';
import {
  APPEND_SVG,
  THEME_COLOR,
  DEFAULT_LANGUAGE,
  TITLE_STATE,
  PRE_OVULATION,
  OVULATION,
  POST_OVULATION,
} from './types';

export function appendSvg() {
  // creating our initial svg that we append to the
  // tag having the body-container class in our app

  const svg = d3.select('.Brain-holder');
  return {
    type: APPEND_SVG,
    payload: svg,
  };
}

export function themeColor({ newColor }) {
  return {
    type: THEME_COLOR,
    payload: newColor,
  };
}

export function defaultLang({ newLang }) {
  return {
    type: DEFAULT_LANGUAGE,
    payload: newLang,
  };
}

export function titleState({ showTitle }) {
  return {
    type: TITLE_STATE,
    payload: showTitle,
  };
}

export function preOvulationState({ preOvulationActive }) {
  return {
    type: PRE_OVULATION,
    payload: preOvulationActive,
  };
}

export function ovulationState({ ovulationActive }) {
  return {
    type: OVULATION,
    payload: ovulationActive,
  };
}

export function postOvulationState({ postOvulationActive }) {
  return {
    type: POST_OVULATION,
    payload: postOvulationActive,
  };
}
