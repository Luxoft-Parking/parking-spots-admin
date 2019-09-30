import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DynamicTable from '../../shared/DynamicTable';

import { getUserInfo, listFreeSpots, assignSpotToUser } from '../../../utils/api';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paperContainer: {
    height: '50%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fieldName: {
    paddingLeft: 0,
  },
  fieldValue: {
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
}));
const spotsCols = [
  { id: 'level', type: 'string', label: 'Level' },
  { id: 'number', type: 'string', label: 'Number' },

];

export default function AssignUsersParking(props) {
  const classes = useStyles();
  const [fullName, setFullName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [freeSpots, setFreeSpots] = React.useState([]);
  const [selectedSpot, setSelectedSpot] = React.useState(null);

  React.useEffect(() => {
    listFreeSpots(setFreeSpots);
    getUserInfo(props.match.params.userId, (userInfo) => {
      setFullName(userInfo.fullName);
      setUsername(userInfo.username);
    }, () => {
      alert('oops!');
    });
  }, [props.match.params.userId]);

  return (
    <div className={[classes.root, classes.paperContainer]}>
      <Grid
        container
        className={classes.paperContainer}
        spacing={1}
      >
        <Grid
          item
          xs={3}>
          <Paper className={classes.paper}>
            <Typography
              gutterBottom
              align={'left'}
              className={classes.fieldName}
              variant={'h6'}>User Name</Typography>
            <Typography
              align={'left'}
              className={classes.fieldValue}>{fullName}</Typography>
            <Typography
              gutterBottom
              align={'left'}
              className={classes.fieldName}
              variant={'h6'}>Email</Typography>
            <Typography
              align={'left'}
              className={classes.fieldValue}>{username}</Typography>
          </Paper>
        </Grid>
        <Grid
          item
          className={classes.paperContainer}
          xs={9}>
          <Paper className={classes.paper}>
            <DynamicTable
              cols={spotsCols}
              rows={freeSpots}
              onAssignClicked={() => {
                if (selectedSpot) {
                  assignSpotToUser(selectedSpot._id, props.match.params.userId, () => {
                    props.history.push('/admin/users');
                  }, () => {
                    alert('Something borke');
                  });
                }
              }}
              onDeleteRowClicked={() => {
                // eslint-disable-next-line no-restricted-globals
                const shouldDelete = confirm('Are you sure you want to remove the user\'s parking spot?');
              }}
              onSelectionChange={setSelectedSpot}
            />
          </Paper>
        </Grid>

      </Grid>
    </div>
  );

}

AssignUsersParking.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
