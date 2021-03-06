import React, { useCallback, useEffect, useState } from 'react';

import {
  Button,
  Fade,
  Grid,
  TextField,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


import { useSocket } from '../../SocketContext';

import { actionUserSetDescription, actionUserSetName } from '../User/action';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  formContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '50%',
    justifyContent: 'space-between',
  },
  form: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: '50%',
  },
  logo: {
    height: 250,
  },
  alert: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  progress: {
    position: 'absolute',
    top: 'calc(50% - 50px)',
    left: 'calc(50% - 50px)',
  }
});

const selector = ({ user: { description, name } }) => ({ description, name });

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const { connected, loginIn, connecting, errorAuth } = useSocket();
  const { description, name } = useSelector(selector);

  useEffect(() => {
    if (!connected) {
      const username = localStorage.getItem('username');
      const description = localStorage.getItem('description');
      const connectionId = localStorage.getItem('connectionId');
      if (username && description && connectionId) {
        loginIn(username, description, connectionId);
      }
    }
  }, [connected, loginIn]);

  useEffect(() => {
    setError(errorAuth);
  }, [errorAuth]);

  const handleChangeUsername = useCallback((e) => {
    dispatch(actionUserSetName(e.target.value));
  }, [dispatch]);

  const handleChangeDescription = useCallback((e) => {
    dispatch(actionUserSetDescription(e.target.value));
  }, [dispatch]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (connecting) {
      return;
    }

    if (name.trim() === '') {
      setError('You must provide a username');
      return;
    }

    if (description.trim() === '') {
      setError('You must provide a description.');
      return;
    }

    setError('');
    await loginIn(name, description);
  }, [connecting, description, loginIn, name]);

  return (
    <Grid className={classes.root}>
      <Grid 
        className={classes.formContainer}
        item
        xs={6}
      >
        <img
          alt="Logo"
          className={classes.logo}
          src="icon.png"
        />
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <TextField
            className={classes.input}
            label="Username"
            onChange={handleChangeUsername}
          />
          <TextField
            className={classes.input}
            label="Description"
            onChange={handleChangeDescription}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </form>
        {
          error !== "" && (
            <Fade in>
              <Alert
                className={classes.alert}  
                variant="filled"
                severity="error"
              >
                {error}
              </Alert>
            </Fade>
          )
        }
        {
          connecting && (
            <CircularProgress
              className={classes.progress}
              size={50}
            />
          )
        }
      </Grid>
    </Grid>
  );
};

export default Auth;
