import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import StudentMode from './modes/StudentMode';
import { DEFAULT_LANG, DEFAULT_MODE } from '../config/settings';
import './App.css';
import { getAppInstance, getContext } from '../actions';
import TeacherMode from './modes/TeacherMode';

library.add(faCalendar);

export class App extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
    dispatchGetContext: PropTypes.func.isRequired,
    dispatchGetAppInstance: PropTypes.func.isRequired,
    mode: PropTypes.string,
    lang: PropTypes.string,
  };

  static defaultProps = {
    mode: DEFAULT_MODE,
    lang: DEFAULT_LANG,
  };

  constructor(props) {
    super(props);
    // first thing to do is get the context
    props.dispatchGetContext();
    // then get the app instance
    props.dispatchGetAppInstance();
  }

  componentDidMount() {
    const { lang } = this.props;
    // set the language on first load
    this.handleChangeLang(lang);
  }

  componentDidUpdate({ lang: prevLang }) {
    const { lang } = this.props;
    // handle a change of language
    if (lang !== prevLang) {
      this.handleChangeLang(lang);
    }
  }

  handleChangeLang = (lang) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lang);
  };

  render() {
    const { mode } = this.props;

    switch (mode) {
      // show teacher view when in producer (educator) mode
      case 'teacher':
      case 'producer':
      case 'educator':
      case 'admin':
        return <TeacherMode />;

      // by default go with the consumer (learner) mode
      case 'student':
      case 'consumer':
      case 'learner':
      default:
        return <StudentMode />;
    }
  }
}

const mapStateToProps = ({ context }) => ({
  lang: context.lang,
  mode: context.mode,
  appInstanceId: context.appInstanceId,
});

const mapDispatchToProps = {
  dispatchGetContext: getContext,
  dispatchGetAppInstance: getAppInstance,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withNamespaces()(ConnectedApp);
