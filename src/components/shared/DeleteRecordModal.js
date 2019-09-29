import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  error: {
    backgroundColor: '#f3555f',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
}));

export default function DeleteRecordModal(props) {
  const classes = useStyles();
  const { error } = props;

  function handleClose() {
    props.onFormClose();
  }

  function onAccept() {
    props.onConfirmDelete();
  }

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        open={props.isOpen}
        onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{''}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Are you sure you want to delete the selected record?'}
          </DialogContentText>
          {
            error && (
              <Paper className={classes.error}>
                <Typography
                  component="p"
                >
                  {'There was a problem deleting the record.'}
                </Typography>
              </Paper>
            )
          }
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={onAccept}>
            {'Accept'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteRecordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};
