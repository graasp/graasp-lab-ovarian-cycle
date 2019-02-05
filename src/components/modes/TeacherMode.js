import React, { Component, Fragment } from 'react';
import MainView from '../views/MainView';
import Header from '../layout/Header';
import Settings from '../controls/settings/Settings';

// using class because in the future we will fetch from api
// eslint-disable-next-line react/prefer-stateless-function
export class TeacherMode extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <MainView />
        <Settings />
      </Fragment>
    );
  }
}

export default TeacherMode;
