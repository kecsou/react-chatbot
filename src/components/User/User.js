import React, { useEffect } from 'react';

import { Grid} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import ChatSection from './chatSection/index';
import Members from './members/index';
import { useSocket } from '../../SocketContext';

const User = () => {
  const { connected } = useSocket();
  const history = useHistory();
  useEffect(() => {
    if (!connected) {
      history.push('/');
    }
  }, [connected, history]);

  return (
    <div className="App">
      <Grid
        container
        direction="row"
        style={{ width: '100%', height: '100%' }}
      >
        <Members />
        <ChatSection />
      </Grid>
    </div>
  );
};

export default User;
