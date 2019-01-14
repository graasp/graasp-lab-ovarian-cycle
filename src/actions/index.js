import * as d3 from 'd3';
import { APPEND_SVG, THEME_COLOR, DEFAULT_LANGUAGE } from './types';

export function appendSvg() {
  // creating our initial svg that we append to the
  // tag having the body-container class in our app
  const svg = d3.select('.body-container').append('svg')
    .attr('width', 700)
    .attr('height', 1500);
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
