import { APPEND_SVG } from '../types';

const INITIAL_STATE = {
  svg: null,
};

// we make sure returning the right action
// to our svg action we created in ../actions path
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case APPEND_SVG:
      return {
        ...state,
        svg: action.payload,
      };
    default:
      return state;
  }
}
