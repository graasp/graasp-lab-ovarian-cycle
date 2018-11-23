import { APPEND_SVG } from '../actions/types';

const INITIAL_STATE = {
  svg: null,
};

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
