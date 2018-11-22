import * as d3 from 'd3';
import { APPEND_SVG } from './types';

export function appendSvg() {
  const svg = d3.select('.Body-Container').append('svg')
    .attr('width', 700)
    .attr('height', 1500);
  return {
    type: APPEND_SVG,
    payload: svg,
  };
}

export default appendSvg;
