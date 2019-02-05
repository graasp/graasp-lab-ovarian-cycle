import React, { Component } from 'react';
import classNames from 'classnames';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import { ToastContainer } from 'react-toastify';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Hormones from '../controls/hormones/Hormones';
import Calendar from '../controls/calendar/Calendar';
import Body from '../body/Body';
import { toggleSideMenu } from '../../actions';
import Styles from '../controls/common/Styles';

const styles = Styles;

class Main extends Component {
  handleToggleSideMenu = open => () => {
    const {
      dispatchToggleSideMenu,
    } = this.props;
    dispatchToggleSideMenu(open);
  };

  render() {
    const {
      classes,
      showSideMenu,
      themeColor,
      showHeader,
      ovulation,
      postOvulation,
      preOvulation,
      secreteLhFsh,
      secreteProgest,
      secreteOestro,
      dayCount,
    } = this.props;
    return (
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: showSideMenu,
        })}
      >
        { showHeader ? (
          <div className={classes.drawerHeader} />
        ) : ''
        }
        <Calendar
          dayCount={dayCount}
          themeColor={themeColor}
        />
        { showHeader ? ''
          : (
            <Fab
              color="primary"
              aria-label="Add"
              onClick={this.handleToggleSideMenu(!showSideMenu)}
              className={classes.fab}
              style={{ backgroundColor: themeColor, outline: 'none' }}
            >
              { showSideMenu ? <MenuIcon style={{ color: 'white' }} /> : <ChevronRightIcon /> }
            </Fab>
          )
        }

        <Hormones
          ovulation={ovulation}
          postOvulation={postOvulation}
          preOvulation={preOvulation}
          secreteLhFsh={secreteLhFsh}
          secreteProgest={secreteProgest}
          secreteOestro={secreteOestro}
        />
        <ToastContainer autoClose={10000} />
        <Body />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  showHeader: state.layout.showHeader,
  showSideMenu: state.layout.showSideMenu,
  themeColor: state.layout.themeColor,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

const StyledComponent = withStyles(styles)(ConnectedComponent);

export default withNamespaces()(StyledComponent);
