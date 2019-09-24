import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { createOrEditUser } from '../../../utils/api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  error: {
    backgroundColor: '#f3555f',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
}));

export default function UserDataForm(props) {
  const classes = useStyles();
  const [fullName, setFullName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDriver, setDriver] = React.useState(true);
  const [team, setTeam] = React.useState('');
  const [userId, setUserId] = React.useState(null);
  const [error, setError] = React.useState(false);
  const { user } = props;

  React.useEffect(() => {

    if (user) {
      setFullName(user.fullName);
      setUsername(user.username);
      setPassword(user.password);
      setDriver(user.isDriver);
      setTeam(user.team);
      setUserId(user._id);
    } else {
      setFullName('');
      setUsername('');
      setPassword('');
      setDriver(false);
      setTeam('AMI');
      setUserId(null);

    }
  }, [user]);

  function handleClose() {
    props.onFormClose();
  }

  function onSuccess(userResponse) {
    if (user) {
      props.onUserEdited(userResponse);
    } else {
      props.onUserAdded(userResponse);
    }
  }

  function onError(error) {
    if (error) {
      console.error(error);
    }
    setError(true);
  }

  const handlers = {
    fullName: setFullName,
    username: setUsername,
    password: setPassword,
    driver: setDriver,
    team: setTeam,
  };

  function handleChange({ target: { name, value, checked } }) {

    if (name === 'driver')
      value = checked;
    handlers[name](value);
  }

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        open={props.isOpen}
        onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{`${user ? 'Edit' : 'Add'} User`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`${user ? '' : 'New'} User data`}
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            id="fullName"
            label="Full Name"
            margin="dense"
            name="fullName"
            type="text"
            value={fullName}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            fullWidth
            id="username"
            label="Email"
            margin="dense"
            name="username"
            type="email"
            value={username}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            fullWidth
            id="password"
            label="User's Password"
            margin="dense"
            name="password"
            type="text"
            value={password}
            onChange={handleChange}
          />
          <FormControl
            fullWidth
            className={classes.formControl}>
            <InputLabel htmlFor="team">Team</InputLabel>
            <Select
              inputProps={{
                name: 'team',
                id: 'team',
              }}
              value={team}
              onChange={handleChange}
            >
              <MenuItem value={'AMI'}>AMI</MenuItem>
              <MenuItem value={'Avaya'}>Avaya</MenuItem>
              <MenuItem value={'Chamberlain'}>Chamberlain</MenuItem>
              <MenuItem value={'CostCenter'}>CostCenter</MenuItem>
              <MenuItem value={'DE'}>DE</MenuItem>
              <MenuItem value={'Expedia'}>Expedia</MenuItem>
              <MenuItem value={'Hotwire'}>Hotwire</MenuItem>
              <MenuItem value={'J.D.'}>J.D.</MenuItem>
              <MenuItem value={'JD'}>JD</MenuItem>
              <MenuItem value={'JDE'}>JDE</MenuItem>
              <MenuItem value={'Spirent'}>Spirent</MenuItem>
              <MenuItem value={'Vrbo'}>Vrbo</MenuItem>
              <MenuItem value={'WD'}>WD</MenuItem>
              <MenuItem value={'WorldQuant'}>WorldQuant</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={(
              <Switch
                checked={isDriver}
                inputProps={{ name: 'driver' }}
                onChange={handleChange}
              />
            )}
            label="Is the user a Driver?"
          />
          {
            error && (
              <Paper className={classes.error}>
                <Typography
                  component="h1"
                  variant="h5" >
                  {'There was a problem creating the user.'}
                </Typography>
              </Paper>
            )
          }
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={createOrEditUser(userId, fullName, username, password, team, isDriver, onSuccess, onError)}>
            {`${user ? 'Edit' : 'Create'} User`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

UserDataForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onUserAdded: PropTypes.func.isRequired,
  onUserEdited: PropTypes.func.isRequired,
  user: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string,
    team: PropTypes.string.isRequired,
    isDriver: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};
