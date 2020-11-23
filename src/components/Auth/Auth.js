import React, { useCallback, useEffect, useState } from 'react';

import {
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

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
});

const selector = ({ user: { description, name } }) => ({ description, name });

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [
    connecting,
    setConnecting
  ] = useState(false);

  const { connected, loginIn } = useSocket();
  const { description, name } = useSelector(selector);

  useEffect(() => {
    console.log('connected', connected);
    if (!connected) {
      const username = localStorage.getItem('username');
      const description = localStorage.getItem('description');
      console.log('username', username);
      console.log('description', description);
      if (username !== null && description !== null) {
        loginIn(username, description);
      }
    }
  }, [connected]);

  const handleChangeUsername = useCallback((e) => {
    dispatch(actionUserSetName(e.target.value));
  }, [dispatch]);

  const handleChangeDescription = useCallback((e) => {
    dispatch(actionUserSetDescription(e.target.value));
  }, [dispatch]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setConnecting(true);
    await loginIn(name, description);
    setConnecting(false);
  }, [description, loginIn, name]);

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
          src="chatbot.png"
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
          connecting && (
            <CircularProgress style={{ position: 'absolute' }} />
          )
        }
      </Grid>
    </Grid>
  );
};

export default Auth;
