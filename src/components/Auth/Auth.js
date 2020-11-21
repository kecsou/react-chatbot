import React, { useCallback, useState } from 'react';

import {
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@material-ui/core';

import {
  useHistory
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { useSocket } from '../../SocketContext';
import { useDispatch } from 'react-redux';
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

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [connecting, setConnecting] = useState(false);

  const { loginIn } = useSocket();

  const handleChangeUsername = useCallback((e) => {
    dispatch(actionUserSetName(e.target.value));
  }, [dispatch]);

  const handleChangeDescription = useCallback((e) => {
    dispatch(actionUserSetDescription(e.target.value));
  }, [dispatch]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setConnecting(true);
    await loginIn();
    setConnecting(false);
    history.push('/user');
  }, [loginIn, history]);

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
