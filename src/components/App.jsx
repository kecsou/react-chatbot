import React from 'react';
import { Provider } from 'react-redux';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import { createMuiTheme, makeStyles } from '@material-ui/core';
import { ThemeProvider, } from '@material-ui/styles';

import SocketProvider from '../SocketContext';
import User from './User/User';
import store from '../store';
import Auth from './Auth/Auth';
import NotFound from './NotFound';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#11567b',
    },
    secondary: {
      main: '#4e98ab',
    },
    tertiary: {
      main: '#61aed0',
    },
    text: {
      primary: '#FFF',
      secondary: '#4e98ab'
    },
    background: {
      default: '#181a1b',
    }
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    background: theme.palette.background.default,
  }
}));

const MainContainer = () => {
  const classes = useStyles();
  return (
    <div 
      className={classes.root}
      unselectable="on"
    >
      <Switch>
        <Route exact path="/user">
          <User />
        </Route>
        <Route exact path="/">
          <Auth />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SocketProvider>
            <MainContainer />
          </SocketProvider>
        </BrowserRouter>
        </ThemeProvider>
    </Provider>
  );
}

export default App;
