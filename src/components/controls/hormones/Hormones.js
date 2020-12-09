import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import './Hormones.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    position: 'absolute',
    width: 400,
  },
  list: {
    backgroundColor: 'transparent',
    marginTop: 80,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  lh: {
    color: '#12a3c1',
  },
  fsh: {
    color: '#ff7a00',
  },
  est: {
    color: '#3bc71f',
  },
  pro: {
    color: '#9C27B0',
  },
});

export class Hormones extends Component {
  state = { dense: false };

  render() {
    const {
      classes,
      // secreteLhFsh,
      secreteFsh,
      secreteLh,
      secreteProgest,
      secreteOestro,
      t,
    } = this.props;
    const { dense } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <div className={classes.list}>
              <List dense={dense}>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecord className={classes.lh} />
                  </ListItemIcon>
                  <ListItemText
                    secondary={`${t('LH')}`}
                    // className={`${secreteLhFsh ? 'animate-lh-hormones' : ''} lh-name`}
                    className={`${secreteLh ? 'animate-lh-hormones' : ''} lh-name`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecord className={classes.fsh} />
                  </ListItemIcon>
                  <ListItemText
                    secondary={`${t('FSH')}`}
                    // className={`${secreteLhFsh ? 'animate-fsh-hormones' : ''} fsh-name`}
                    className={`${secreteFsh ? 'animate-fsh-hormones' : ''} fsh-name`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecord className={classes.est} />
                  </ListItemIcon>
                  <ListItemText
                    secondary={`${t('Oestrogens')}`}
                    className={`${secreteOestro ? 'animate-oestro-hormones' : ''} oestro-name`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecord className={classes.pro} />
                  </ListItemIcon>
                  <ListItemText
                    secondary={`${t('Progesterones')}`}
                    className={`${secreteProgest ? 'animate-progest-hormones' : ''} progest-name`}
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Hormones.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  secreteFsh: PropTypes.bool.isRequired,
  secreteLh: PropTypes.bool.isRequired,
  secreteProgest: PropTypes.bool.isRequired,
  secreteOestro: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(withStyles(styles)(Hormones));
