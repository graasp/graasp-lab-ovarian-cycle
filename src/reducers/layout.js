import {
  TOGGLE_SIDE_MENU,
  TOGGLE_HEADER,
  CHANGE_THEME_COLOR,
} from '../types';

const INITIAL_STATE = {
  showSideMenu: false,
  showHeader: true,
  themeColor: '#03a9f4',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        showSideMenu: payload,
      };
    case TOGGLE_HEADER:
      return {
        ...state,
        showHeader: payload,
      };
    case CHANGE_THEME_COLOR:
      return {
        ...state,
        themeColor: payload,
      };
    default:
      return state;
  }
};
