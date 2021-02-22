import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import Switch from 'react-switch';
import { withTranslation } from 'react-i18next';
import {
  Col,
  Row,
} from 'reactstrap';
import LangBox from './LangBox';
import SwitchBox from './SwitchBox';
import {
  toggleHeader,
  changeThemeColor,
  changeLanguage,
} from '../../../actions';

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
    zIndex: 10000,
  },
});

class Settings extends Component {
  state = {
    openModal: false,
  };

  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchChangeThemeColor: PropTypes.func.isRequired,
    dispatchToggleHeader: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
    themeColor: PropTypes.string.isRequired,
    showHeader: PropTypes.bool.isRequired,
  };

  handleChangeComplete = (color) => {
    const newColor = color.hex;
    const { dispatchChangeThemeColor } = this.props;
    dispatchChangeThemeColor(newColor);
    this.postMessage({ themeColor: newColor });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
    this.postMessage({ open_setting_modal: false });
  };

  handleToggleModal = () => {
    const { openModal } = this.state;
    this.setState({ openModal: !openModal });
    this.postMessage({ open_setting_modal: !openModal });
  };

  handleToggleHeader = () => {
    const { showHeader } = this.props;
    const { dispatchToggleHeader } = this.props;
    dispatchToggleHeader(!showHeader);
    this.postMessage({ show_title: showHeader });
  };

  postMessage = (data) => {
    const message = JSON.stringify(data);
    // console.log('message', message);
    if (document.postMessage) {
      document.postMessage(message, '*');
    } else if (window.postMessage) {
      window.postMessage(message, '*');
    } else {
      // console.error('unable to find postMessage');
    }
  };

  render() {
    const {
      t,
      classes,
      themeColor,
      showHeader,
    } = this.props;
    const {
      openModal,
    } = this.state;
    return (
      <div className="setting-container">
        <Fab
          color="primary"
          aria-label="Add"
          onClick={this.handleToggleModal}
          className={classes.fab}
          style={{ backgroundColor: themeColor }}
        >
          <AddIcon style={{ color: 'white' }} />
        </Fab>
        <Modal open={openModal} onClose={this.handleCloseModal} center>
          <SwitchBox
            color={themeColor}
            handleChangeComplete={this.handleChangeComplete}
          />
          <LangBox />
          <Row className="title-switch">
            <Col xs={8}>
              <h4 className="modal-lang-title">{t('Display Lab title')}</h4>
            </Col>
            <Col xs={4}>
              <Switch
                onChange={this.handleToggleHeader}
                checked={showHeader}
                id="title-switch"
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showHeader: state.layout.showHeader,
});

const mapDispatchToProps = {
  dispatchToggleHeader: toggleHeader,
  dispatchChangeThemeColor: changeThemeColor,
  dispatchChangeLanguage: changeLanguage,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Settings);
const StyledComponent = withStyles(styles)(ConnectedComponent);
export default withTranslation()(StyledComponent);
