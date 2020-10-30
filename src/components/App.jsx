import React from 'react';
import { Provider } from 'react-redux';

import {
  Grid,
} from '@material-ui/core';

import store from '../store';

import BotList from './botList/index';
import ChatSection from './chatSection/index';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Grid
          container
          direction="row"
          style={{ width: '100%', height: '100%' }}
        >
          <BotList />
          <ChatSection />
        </Grid>
      </div>
    </Provider>
  );
}

export default App;
