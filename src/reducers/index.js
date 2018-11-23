import { combineReducers } from 'redux';
import svgReducer from './svg';

export default combineReducers({
  svg: svgReducer,
});
