import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import Fab from '@material-ui/core/Fab';
import Switch from 'react-switch';
import {
  Col,
  Row,
} from 'reactstrap';
import LangBox from './LangBox';
import SwitchBox from './SwitchBox';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  fab: {
    right: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 4,
    position: 'fixed',
  },
  ref: {
    right: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 12,
    position: 'fixed',
  },
});

const Setting = ({
  t,
  onOpenModal,
  openModal,
  onCloseModal,
  handleChangeComplete,
  handleLang,
  classes,
  themeColor,
  toggleTitle,
  showTitle,
  reloadPage,
}) => (
  <div className="setting-container">
    <Fab
      color="primary"
      aria-label="Add"
      onClick={onOpenModal}
      className={classes.fab}
      style={{ backgroundColor: themeColor }}
    >
      <AddIcon style={{ color: 'white' }} />
    </Fab>
    <Fab
      color="primary"
      aria-label="Add"
      onClick={reloadPage}
      className={classes.ref}
      style={{ backgroundColor: themeColor }}
    >
      <RefreshIcon style={{ color: 'white' }} />
    </Fab>
    <Modal open={openModal} onClose={onCloseModal} center>
      <SwitchBox
        handleChangeComplete={handleChangeComplete}
        t={t}
      />
      <LangBox
        handleLang={handleLang}
        t={t}
      />
      <Row className="title-switch">
        <Col xs={8}>
          <h5 className="display-title">{t('Display Lab title')}</h5>
        </Col>
        <Col xs={4}>
          <Switch
            onChange={toggleTitle}
            checked={showTitle}
            id="title-switch"
          />
        </Col>
      </Row>
    </Modal>
  </div>
);


Setting.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
  handleLang: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
  themeColor: PropTypes.string.isRequired,
  toggleTitle: PropTypes.func.isRequired,
  showTitle: PropTypes.bool.isRequired,
  reloadPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
  showTitle: state.setting.showTitle,
});

const connectedComponent = connect(mapStateToProps)(Setting);
export default withStyles(styles)(connectedComponent);
