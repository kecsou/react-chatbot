import React, { useEffect, } from 'react';

import { Grid} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import ChatSection from './chatSection/index';
import Members from './members/index';
import { useSocket } from '../../SocketContext';

const User = () => {
  const {
    connected,
    connecting,
    loginIn,
    logOut
  } = useSocket();

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
          <Button
            color="inherit"
            onClick={logOut}
          >
            Log out
          </Button>
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
