import React, { Component, Fragment } from 'react';
import MainView from '../views/MainView';
import Header from '../layout/Header';

export class StudentMode extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <MainView />
      </Fragment>
    );
  }
}

export default StudentMode;
