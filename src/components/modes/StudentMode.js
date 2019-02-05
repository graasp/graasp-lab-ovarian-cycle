import React, { Component, Fragment } from 'react';
import MainView from '../views/MainView';
import Header from '../layout/Header';

// using class because in the future we will fetch from api
// eslint-disable-next-line react/prefer-stateless-function
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
