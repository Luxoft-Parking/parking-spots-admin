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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { createOrEditSpot } from '../../../utils/api';

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

export default function SpotDataForm(props) {
  const classes = useStyles();
  const [level, setLevel] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [spotId, setSpotId] = React.useState(null);
  const [error, setError] = React.useState(false);
  const { spot } = props;

  React.useEffect(() => {

    if (spot) {
      setLevel(spot.level);
      setNumber(spot.number);
      setSpotId(spot._id);
    } else {
      setLevel('');
      setNumber('');
      setSpotId(null);
    }
  }, [spot]);

  function handleClose() {
    props.onFormClose();
  }

  function onSuccess(spotResponse) {
    if (spot) {
      props.onSpotEdited(spotResponse);
    } else {
      props.onSpotAdded(spotResponse);
    }
  }

  function onError(error) {
    if (error) {
      console.error(error);
    }
    setError(true);
  }

  const handlers = {
    level: setLevel,
    number: setNumber,
  };

  function handleChange({ target: { name, value, checked } }) {

    if (name === 'isFree')
      value = checked;
    handlers[name](value);
  }

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        open={props.isOpen}
        onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{`${spot ? 'Edit' : 'Add'} Spot`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`${spot ? '' : 'New'} Spot data`}
          </DialogContentText>
          <FormControl
            className={classes.formControl}
            component="fieldset">
            <FormLabel component="legend">Level</FormLabel>
            <RadioGroup
              row
              aria-label="level"
              name="level"
              value={level}
              onChange={handleChange}
            >
              <FormControlLabel
                control={<Radio />}
                label="Basement 1"
                labelPlacement="bottom"
                value="Basement 1" />
              <FormControlLabel
                control={<Radio />}
                label="Basement 2"
                labelPlacement="bottom"
                value="Basement 2" />
              <FormControlLabel
                control={<Radio />}
                label="Basement 3"
                labelPlacement="bottom"
                value="Basement 3" />
            </RadioGroup>
          </FormControl>
          <TextField
            autoFocus
            fullWidth
            id="number"
            label="Spot Number"
            margin="dense"
            name="number"
            type="email"
            value={number}
            onChange={handleChange}
          />
          {
            error && (
              <Paper className={classes.error}>
                <Typography
                  component="h1"
                  variant="h5" >
                  {'There was a problem creating the spot.'}
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
            onClick={createOrEditSpot(spotId, level, number, onSuccess, onError)}>
            {`${spot ? 'Edit' : 'Create'} Spot`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SpotDataForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onSpotAdded: PropTypes.func.isRequired,
  onSpotEdited: PropTypes.func.isRequired,
  spot: PropTypes.shape({
    level: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};
