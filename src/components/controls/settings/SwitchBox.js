import React from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
import { Col, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';

const SwitchBox = ({
  color,
  handleChangeComplete,
  t,
}) => (
  <div className="control-container">
    <Row>
      <Col xs="12">
        <h4 className="modal-color-title">{t('Choose your panel color')}</h4>
        <CirclePicker
          color={color}
          onChangeComplete={handleChangeComplete}
        />
      </Col>
    </Row>
  </div>
);

SwitchBox.propTypes = {
  t: PropTypes.func.isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default withTranslation()(SwitchBox);
