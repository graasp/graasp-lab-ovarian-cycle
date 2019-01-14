import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Modal from 'react-responsive-modal';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
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
});

const Refresher = ({
  reloadPage,
  t,
  onOpenModal,
  openModal,
  onCloseModal,
  handleChangeComplete,
  handleLang,
  classes,
  themeColor,
}) => {
  const defaultColor = themeColor || '#0f94f8';
  return (
    <div className="modal-container">
      <Fab
        color="primary"
        aria-label="Add"
        onClick={onOpenModal}
        className={classes.fab}
        style={{ backgroundColor: defaultColor }}
      >
        <AddIcon style={{ color: 'white' }} />
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
      </Modal>
      <Button
        onClick={reloadPage}
      >
        <svg
          aria-hidden="true"
          data-prefix="fas"
          data-icon="redo-alt"
          className="svg-inline--fa fa-redo-alt fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            className="redo-btn"
            fill={defaultColor}
            d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"
          />
        </svg>
      </Button>
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
  classes: PropTypes.shape({}).isRequired,
  themeColor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.theme_color,
});

const connectedComponent = connect(mapStateToProps)(Refresher);
export default withStyles(styles)(connectedComponent);
