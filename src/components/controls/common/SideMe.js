import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Visualizer from '../visualizer/Visualizer';
import Hormones from '../hormones/Hormones';
import Calendar from '../calendar/Calendar';
import Body from '../../body/Body';
import Styles from './Styles';

const styles = Styles;

class PersistentDrawerRight extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      theme,
      dayCount,
      isStarted,
      ovulation,
      ovulationActive,
      preOvulationActive,
      postOvulationActive,
      reloadPage,
      handleOvulation,
      handlePostOvulation,
      handlePreOvulation,
      handleStart,
      handleStop,
      postOvulation,
      preOvulation,
      secreteLhFsh,
      secreteOestro,
      secreteProgest,
      obserViewActive,
      themeColor,
      showTitle,
      t,
    } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        { showTitle ? (
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar disableGutters={!open} style={{ backgroundColor: themeColor }}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" color="inherit" noWrap className={classes.title}>
                {t('Synchronization of the ovarian cycle')}
              </Typography>
            </Toolbar>
          </AppBar>
        ) : ''
        }
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          { showTitle ? (
            <div className={classes.drawerHeader} />
          ) : ''
          }
          <Calendar
            dayCount={dayCount}
            themeColor={themeColor}
          />
          <Fab
            color="primary"
            aria-label="Add"
            onClick={this.handleDrawerOpen}
            className={classes.fab}
            style={{ backgroundColor: themeColor }}
          >
            <MenuIcon style={{ color: 'white' }} />
          </Fab>
          <Hormones
            ovulation={ovulation}
            postOvulation={postOvulation}
            preOvulation={preOvulation}
            secreteLhFsh={secreteLhFsh}
            secreteProgest={secreteProgest}
            secreteOestro={secreteOestro}
            t={t}
          />
          <ToastContainer autoClose={20000} />
          <Body />
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <h3>Observe</h3>
          </div>
          <Divider />
          <Visualizer
            dayCount={dayCount}
            isStarted={isStarted}
            handleOvulation={handleOvulation}
            handlePostOvulation={handlePostOvulation}
            handlePreOvulation={handlePreOvulation}
            reloadPage={reloadPage}
            handleStart={handleStart}
            handleStop={handleStop}
            ovulation={ovulation}
            ovulationActive={ovulationActive}
            preOvulationActive={preOvulationActive}
            postOvulationActive={postOvulationActive}
            postOvulation={postOvulation}
            preOvulation={preOvulation}
            secreteLhFsh={secreteLhFsh}
            secreteOestro={secreteOestro}
            secreteProgest={secreteProgest}
            obserViewActive={obserViewActive}
            themeColor={themeColor}
            t={t}
          />
        </Drawer>
      </div>
    );
  }
}

PersistentDrawerRight.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  dayCount: PropTypes.number.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  handleOvulation: PropTypes.func.isRequired,
  handlePostOvulation: PropTypes.func.isRequired,
  handlePreOvulation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  reloadPage: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  ovulation: PropTypes.bool.isRequired,
  ovulationActive: PropTypes.bool.isRequired,
  postOvulationActive: PropTypes.bool.isRequired,
  preOvulationActive: PropTypes.bool.isRequired,
  postOvulation: PropTypes.bool.isRequired,
  preOvulation: PropTypes.bool.isRequired,
  secreteLhFsh: PropTypes.bool.isRequired,
  secreteOestro: PropTypes.bool.isRequired,
  secreteProgest: PropTypes.bool.isRequired,
  obserViewActive: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  showTitle: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
  showTitle: state.setting.showTitle,
});

const connectedComponent = connect(mapStateToProps)(PersistentDrawerRight);

export default withStyles(styles, { withTheme: true })(connectedComponent);
