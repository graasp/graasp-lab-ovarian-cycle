import * as d3 from 'd3';
import { APPEND_SVG } from './types';

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

// exporting this function will dispatch the created svg
// we could retrieve from all other component
// but currently we are just retrieving it from our app.js
export default appendSvg;
