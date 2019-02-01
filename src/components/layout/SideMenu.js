import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Visualizer from '../controls/visualizer/Visualizer';
import styles from '../controls/common/Styles';
import { toggleSideMenu } from '../../actions';

class SideMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    theme: PropTypes.shape({}).isRequired,
    dayCount: PropTypes.number.isRequired,
    handleFullCycle: PropTypes.func.isRequired,
    handleStop: PropTypes.func.isRequired,
    handleOvulation: PropTypes.func.isRequired,
    handlePostOvulation: PropTypes.func.isRequired,
    handlePreOvulation: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
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
    showSideMenu: PropTypes.bool.isRequired,
    dispatchToggleSideMenu: PropTypes.func.isRequired,
  };

  handleToggleSideMenu = open => () => {
    const {
      dispatchToggleSideMenu,
    } = this.props;
    dispatchToggleSideMenu(open);
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
      handleOvulation,
      handlePostOvulation,
      handlePreOvulation,
      handleFullCycle,
      handleStop,
      postOvulation,
      preOvulation,
      secreteLhFsh,
      secreteOestro,
      secreteProgest,
      obserViewActive,
      themeColor,
      t,
      showSideMenu,
    } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={showSideMenu}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleToggleSideMenu(false)} style={{ outline: 'none' }}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <h3>{t('Observe')}</h3>
          </div>
          <Divider />
          <Visualizer
            dayCount={dayCount}
            isStarted={isStarted}
            handleOvulation={handleOvulation}
            handlePostOvulation={handlePostOvulation}
            handlePreOvulation={handlePreOvulation}
            handleFullCycle={handleFullCycle}
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
          />
        </Drawer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showSideMenu: state.layout.showSideMenu,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

const StyledComponent = withStyles(styles, { withTheme: true })(ConnectedComponent);

export default withNamespaces()(StyledComponent);
