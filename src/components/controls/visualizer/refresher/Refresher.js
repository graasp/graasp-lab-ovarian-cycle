import React from 'react';
import Qs from 'qs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Setting from './Setting';

const Refresher = ({
  reloadPage,
  t,
  onOpenModal,
  openModal,
  onCloseModal,
  handleChangeComplete,
  handleLang,
  themeColor,
  toggleTitle,
}) => {
  const {
    mode = 'default',
  } = Qs.parse(window.location.search, { ignoreQueryPrefix: true });
  return (
    <div className="modal-container">
      { mode === 'default' ? (
        <Setting
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          openModal={openModal}
          handleChangeComplete={handleChangeComplete}
          handleLang={handleLang}
          themeColor={themeColor}
          toggleTitle={toggleTitle}
          reloadPage={reloadPage}
          t={t}
        />
      ) : ''
      }
    </div>
  );
};


Refresher.propTypes = {
  reloadPage: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
  handleLang: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  toggleTitle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
});

export default connect(mapStateToProps)(Refresher);
