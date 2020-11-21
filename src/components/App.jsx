import React from 'react';
import { Provider } from 'react-redux';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider, } from '@material-ui/styles';

import SocketProvider from '../SocketContext';
import User from './User/User';
import store from '../store';
import Auth from './Auth/Auth';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7cc5ed',
    },
    secondary: {
      main: '#4e98ab'
    },
    tertiary: {
      main: '#61aed0',
    },
  }
});


function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path="/user">
                <User />
              </Route>
              <Route path="/">
                <Auth />
              </Route>
            </Switch>
          </ThemeProvider>
        </BrowserRouter>
      </SocketProvider>
    </Provider>
  );
}

export default App;
