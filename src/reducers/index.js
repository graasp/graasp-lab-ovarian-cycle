import { combineReducers } from 'redux';
import simulationReducer from './simulation';
import svgReducer from './svg';
import appInstanceReducer from './appInstance';
import usersReducer from './users';
import contextReducer from './context';
import layoutReducer from './layout';

export default combineReducers({
  svg: svgReducer,
  simulation: simulationReducer,
  context: contextReducer,
  users: usersReducer,
  appInstance: appInstanceReducer,
  layout: layoutReducer,
});
