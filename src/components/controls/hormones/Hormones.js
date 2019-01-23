import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    position: 'absolute',
    width: 400,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
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

class InteractiveList extends React.Component {
  state = {
    dense: false,
    secondary: false,
  };

  render() {
    const {
      classes,
      secreteLhFsh,
      secreteProgest,
      secreteOestro,
      t,
    } = this.props;
    const { dense, secondary } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={dense}>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecord className={classes.lh} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${t('LH')}`}
                    secondary={secondary ? 'Secondary text' : null}
                    className={`${secreteLhFsh ? 'animate-lh-hormones' : ''} lh-name`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecord className={classes.fsh} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${t('FSH')}`}
                    secondary={secondary ? 'Secondary text' : null}
                    className={`${secreteLhFsh ? 'animate-fsh-hormones' : ''} fsh-name`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecord className={classes.est} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${t('Oestrogens')}`}
                    secondary={secondary ? 'Secondary text' : null}
                    className={`${secreteOestro ? 'animate-oestro-hormones' : ''} oestro-name`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecord className={classes.pro} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${t('Progesterones')}`}
                    secondary={secondary ? 'Secondary text' : null}
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

InteractiveList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  secreteLhFsh: PropTypes.string.isRequired,
  secreteProgest: PropTypes.string.isRequired,
  secreteOestro: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(InteractiveList);
