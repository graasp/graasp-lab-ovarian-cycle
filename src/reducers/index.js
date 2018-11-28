import { combineReducers } from 'redux';
import svgReducer from './svg';
// here we just import and pass our created svg
// from the svg component and pass it to our react reducer
export default combineReducers({
  svg: svgReducer,
});
