import { DEFAULT_LANGUAGE } from '../actions/types';

const INITIAL_STATE = {
  defaultLang: '#0f94f8',
};

// we make sure returning the right action
// to our svg action we created in ../actions path
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DEFAULT_LANGUAGE:
      return {
        ...state,
        defaultLang: action.payload,
      };
    default:
      return state;
  }
}
