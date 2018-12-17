import React, { Component } from 'react';
import Qs from 'qs';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import './App.css';
import StudentView from './student/StudentView';

export class App extends Component {
  static propTypes = {
    i18n: PropTypes.shape({}).isRequired,
    t: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const {
      lang = 'en',
      mode = 'default',
    } = Qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const { i18n } = this.props;
    // querying the language code from the browser url params
    i18n.changeLanguage(lang);
    this.state = { mode };
  }

  render() {
    const { mode } = this.state;
    const { t } = this.props;

    switch (mode) {
      // our student view will basically render all the lab student side
      // by default go with the student mode
      // we pass {t} as params for the internationalization
      case 'student':
      default:
        return <StudentView t={t} />;
    }
  }
}

export default withNamespaces('translations')(App);
