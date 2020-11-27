import React, { useEffect, } from 'react';

import { Grid, makeStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import ChatSection from './chatSection/index';
import Members from './members/index';
import { useSocket } from '../../SocketContext';

const useStyle = makeStyles({
  containerAppBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const User = () => {
  const {
    connected,
    connecting,
    loginIn,
    logOut
  } = useSocket();

  const classes = useStyle();

  useEffect(() => {
    if (!connected && !connecting) {
      const username = localStorage.getItem('username');
      const description = localStorage.getItem('description');

      if (username && description) {
        loginIn(username, description);
      } else {
        logOut();
      }
    }
  }, [connected, connecting, loginIn, logOut]);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <div className={classes.containerAppBar}>
            <Button
            color="inherit"
            onClick={logOut}
          >
            Log out
          </Button>
          <img
            alt="React Node"
            src="./icon.png"
            width="75px"
          />
          </div>
          
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="row"
        style={{ width: '100%', height: 'calc(100% - 65px)' }}
      >
        <Grid
          item
          xl={2}
          lg={2}
          md={3}
          xs={5}
          style={{ height: '100%' }}
        >
          <Members />
        </Grid>
        <Grid
          item
          xl={10}
          lg={10}
          md={9}
          xs={7}
          style={{ height: '100%' }}
        >
          <ChatSection />
        </Grid>
      </Grid>
    </div>
  );
};

export default User;
