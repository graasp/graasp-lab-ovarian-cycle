import React, { Component, Fragment } from 'react';
import MainView from '../views/MainView';
import Header from '../layout/Header';
import Settings from '../controls/settings/Settings';

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
