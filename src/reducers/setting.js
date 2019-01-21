import {
  THEME_COLOR,
  TITLE_STATE,
  PRE_OVULATION,
  OVULATION,
  POST_OVULATION,
} from '../actions/types';

const INITIAL_STATE = {
  themeColor: '#0f94f8',
  showTitle: true,
  preOvulationActive: false,
  postOvulationActive: false,
  ovulationActive: false,
};

// we make sure returning the right action
// to our svg action we created in ../actions path
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case THEME_COLOR:
      return {
        ...state,
        themeColor: action.payload,
      };
    case TITLE_STATE:
      return {
        ...state,
        showTitle: action.payload,
      };
    case PRE_OVULATION:
      return {
        ...state,
        preOvulationActive: action.payload,
      };
    case OVULATION:
      return {
        ...state,
        ovulationActive: action.payload,
      };
    case POST_OVULATION:
      return {
        ...state,
        postOvulationActive: action.payload,
      };
    default:
      return state;
  }
}
