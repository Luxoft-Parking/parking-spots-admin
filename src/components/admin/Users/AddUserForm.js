import React from 'react';
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
}));
export default function AddUserForm(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDriver, setDriver] = React.useState(true);
  const [team, setTeam] = React.useState('');

  React.useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen])

  function handleClose() {
    setOpen(false);
    props.onFormClose()
  }

  const handlers = {
    fullName: setFullName,
    username: setUsername,
    password: setPassword,
    driver: setDriver,
    team: setTeam,
  }

  function handleChange({ target: { name, value, checked } }) {
    console.log(`name, value, checked : ${name}, ${value}, ${checked}`);
    if (name === 'driver')
      value = checked
    handlers[name](value);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New User data
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fullName"
            name="fullName"
            label="Full Name"
            type="text"
            fullWidth
            value={fullName}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            name="username"
            label="Email"
            type="email"
            fullWidth
            value={username}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Email"
            type="text"
            fullWidth
            value={password}
            onChange={handleChange}
          />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="age-simple">Team</InputLabel>
            <Select
              value={team}
              onChange={handleChange}
              inputProps={{
                name: 'team',
                id: 'age-simple',
              }}
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
            control={<Switch
              checked={isDriver}
              onChange={handleChange}
              inputProps={{ name: 'driver' }}
            />}
            label="Is the user a Driver?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
