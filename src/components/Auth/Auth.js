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
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [connecting, setConnecting] = useState(false);

  const { loginIn } = useSocket();

  const handleChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handleChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setConnecting(true);
    await loginIn(username, description);
    setConnecting(false);
    history.push('/user');
  }, [description, loginIn, history, username]);

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
