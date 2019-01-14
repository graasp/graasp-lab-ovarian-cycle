import { THEME_COLOR } from '../actions/types';

const INITIAL_STATE = {
  theme_color: '#0f94f8',
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
    default:
      return state;
  }
}
