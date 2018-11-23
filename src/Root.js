import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const Root = ({ children }) => (
  <Provider store={createStore(reducers, {})}>
    {children}
  </Provider>
);

Root.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Root;
