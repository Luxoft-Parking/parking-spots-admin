import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import auth from '../../utils/authentication';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    backgroundColor: '#f3555f',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (auth.currentUser)
    return <Redirect to={'/admin'} />;

  const inputHandlers = { username: setUsername, password: setPassword };

  function onInputChange({ target: { name, value } }) {
    setError(false);
    inputHandlers[name](value);
  }

  async function attemptLogin() {
    setError(false);
    try {
      if (await auth.login(username, password)) {
        props.history.replace('/admin');
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={onInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onInputChange}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={attemptLogin}
          >
            {'Sign In'}
          </Button>
        </form>
      </div>
      {
        error &&
        <Paper className={classes.error}>
          <Typography component="h1" variant="h5" >
            {'There was a problem trying to login.'}<br />{'Check your credentials '}
          </Typography>
        </Paper>
      }
    </Container>
  );
}
