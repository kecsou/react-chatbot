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
    loginIn,
    logOut
  } = useSocket();

  useEffect(() => {
    if (!connected) {
      const username = localStorage.getItem('username');
      const description = localStorage.getItem('description');

      if (username !== null && description !== null) {
        loginIn(username, description);
      } else {
        logOut();
      }
    }
  }, [connected, loginIn, logOut]);

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
        style={{ width: '100%', height: '90%' }}
      >
        <Members />
        <ChatSection />
      </Grid>
    </div>
  );
};

export default User;
