import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import RotationTable from './RotationTable'
import api from '../../../utils/api';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1)
  },
}));
const rows = [{ fullName: 'Ben', reputation: 10, spot: { level: 'Basement 1', number: '234' } }];

export default function Rotation() {
  const classes = useStyles();
  const [currentlyAssigned, setCurrentlyAssigned] = useState([]);
  const [nextAssignment, setNextAssignment] = useState([]);
  const [currentlyUnassigned, setCurrentlyUnassigned] = useState([]);
  const [nextUnassigned, setNextUnassigned] = useState([]);

  useEffect(() => {
    async function getRotation() {
      const rotation = await api.getRotationPreview()
      setCurrentlyAssigned(rotation.currentRole.usersWithParking)
      setCurrentlyUnassigned(rotation.currentRole.usersWithoutParking)
      setNextAssignment(rotation.nextRole.nextWithParking)
      setNextUnassigned(rotation.nextRole.nextWithoutParking)
    }
    getRotation();
  }, [])

  function generateRotation() {
    api.generateRotation()
  }
  return (
    <Grid
      container
      spacing={1}
    >
      <Grid
        container>
        <Grid
          item
          xs={6}
        >
          <Paper className={classes.paper}>
            <Typography
              gutterBottom
              align={'center'}
            >{'Currently unassigned'}</Typography>
            <RotationTable rows={currentlyUnassigned} hasSpotInfo={false} />
          </Paper>
          <Paper className={classes.paper}>
            <Typography
              gutterBottom
              align={'center'}
            >{'Current asssignments'}</Typography>
            <RotationTable rows={currentlyAssigned} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={6}>
          <Paper className={classes.paper}>
            <Typography
              gutterBottom
              align={'center'}
            >{'Next unassigned'}</Typography>
            <RotationTable rows={nextUnassigned} hasSpotInfo={false} />
          </Paper>
          <Paper className={classes.paper}>
            <Typography
              gutterBottom
              align={'center'}
            >{'Next asssignments'}</Typography>
            <RotationTable rows={nextAssignment} hasSpotInfo={false} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Button color={'primary'} onClick={generateRotation}>Generate next rotation</Button>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
