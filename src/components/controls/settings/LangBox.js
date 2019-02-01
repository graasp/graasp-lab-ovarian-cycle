import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { options as langOptions } from '../../../config/options';
import { changeLanguage } from '../../../actions';

class LangBox extends Component {
  static propTypes = {
    dispatchChangeLanguage: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    selectedLanguage: PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }).isRequired,
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
  };

  handleChangeLanguage = (lang) => {
    const newLang = lang.value;
    const { dispatchChangeLanguage, i18n } = this.props;
    i18n.changeLanguage(newLang);
    dispatchChangeLanguage(newLang);
  };

  render() {
    const {
      t,
      selectedLanguage,
    } = this.props;

    return (
      <div className="control-container">
        <Row className="modal-lang-container">
          <Col xs="4">
            <h4 className="modal-lang-title">
              { t('Language') }
            </h4>
          </Col>
          <Col xs="8">
            <Select
              value={selectedLanguage}
              defaultValue={langOptions[0]}
              options={langOptions}
              onChange={this.handleChangeLanguage}
              className="select-lang"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, { i18n }) => {
  const { language } = i18n;
  const selectedLanguage = langOptions.find(langOption => langOption.value === language);
  return {
    selectedLanguage,
  };
};

const mapDispatchToProps = {
  dispatchChangeLanguage: changeLanguage,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(LangBox);

export default withNamespaces()(ConnectedComponent);
