import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const root = document.getElementById('root');

const renderApp = (RootComponent, store) => {
  render(
    <Provider store={store}>
      <RootComponent />
    </Provider>,
    root,
  );
};

// render app to the dom
const { store, history } = configureStore();

renderApp(Root, store, history);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./components/Root').default;
    renderApp(NextRoot, store, history);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
