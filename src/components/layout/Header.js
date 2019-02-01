import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withNamespaces } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Styles from '../controls/common/Styles';
import { toggleSideMenu } from '../../actions';

const styles = Styles;

class Header extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchToggleSideMenu: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
    showSideMenu: PropTypes.bool.isRequired,
    showHeader: PropTypes.bool.isRequired,
    themeColor: PropTypes.string.isRequired,
  };

  handleToggleSideMenu = open => () => {
    const {
      dispatchToggleSideMenu,
    } = this.props;
    dispatchToggleSideMenu(open);
  };

  render() {
    const {
      t,
      classes,
      showSideMenu,
      themeColor,
      showHeader,
    } = this.props;

    // if header is hidden return early
    if (!showHeader) {
      return <Fragment />;
    }

    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, { [classes.appBarShift]: showSideMenu })}
      >
        <Toolbar style={{ backgroundColor: themeColor }} disableGutters>
          <Typography variant="h4" color="inherit" noWrap className={classes.title}>
            {t('Synchronization of the ovarian cycle')}
          </Typography>
          <IconButton
            color="inherit"
            aria-label={t('Open Menu')}
            onClick={this.handleToggleSideMenu(true)}
            className={classNames(classes.menuButton, showSideMenu && classes.hide)}
            style={{ outline: 'none' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  // get settings from redux to show/hide header and button to open side menu
  showHeader: state.layout.showHeader,
  showSideMenu: state.layout.showSideMenu,
  themeColor: state.layout.themeColor,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Header);

const StyledComponent = withStyles(styles)(ConnectedComponent);

export default withNamespaces()(StyledComponent);
