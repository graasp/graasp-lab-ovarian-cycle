import {
  PRE_OVULATION,
  OVULATION,
  POST_OVULATION,
  APPEAR_OVULE,
  DISAPPEAR_OVULE,
  DELETE_OVARIES,
  DELETE_PITUITARY,
} from '../types';

const INITIAL_STATE = {
  preOvulationActive: false,
  postOvulationActive: false,
  ovulationActive: false,
  preOvulationStep: false,
  ovulationStep: false,
  postOvulationStep: false,
  appearOvule: false,
  ovaries: true,
  pituitary: true,
};

// we make sure returning the right action
// to our svg action we created in ../actions path
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PRE_OVULATION:
      return {
        ...state,
        preOvulationActive: action.payload.preOvulationActive,
        preOvulationStep: action.payload.preOvulationStep,
      };
    case OVULATION:
      return {
        ...state,
        ovulationActive: action.payload.ovulationActive,
        ovulationStep: action.payload.ovulationStep,
      };
    case POST_OVULATION:
      return {
        ...state,
        postOvulationActive: action.payload.postOvulationActive,
        postOvulationStep: action.payload.postOvulationStep,
      };
    case APPEAR_OVULE:
      return {
        ...state,
        appearOvule: true,
      };
    case DISAPPEAR_OVULE:
      return {
        ...state,
        appearOvule: false,
      };
    case DELETE_OVARIES:
      return {
        ...state,
        ovaries: false,
      };
    case DELETE_PITUITARY:
      return {
        ...state,
        pituitary: false,
      };
    default:
      return state;
  }
}
