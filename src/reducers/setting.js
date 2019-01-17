import { THEME_COLOR, TITLE_STATE } from '../actions/types';

const INITIAL_STATE = {
  themeColor: '#0f94f8',
  showTitle: true,
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
    default:
      return state;
  }
}
