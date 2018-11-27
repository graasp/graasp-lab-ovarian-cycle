import React, { Component } from 'react';
import Qs from 'qs';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import './App.css';
import StudentView from './student/StudentView';

class App extends Component {
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
    i18n.changeLanguage(lang);
    this.state = { mode };
  }

  render() {
    const { mode } = this.state;
    const { t } = this.props;

    switch (mode) {
      // by default go with the student mode
      case 'student':
      default:
        return <StudentView t={t} />;
    }
  }
}

export default withNamespaces('translations')(App);
