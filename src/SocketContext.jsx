import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { io } from 'socket.io-client';
import { actionUserSetDescription, actionUserSetName } from './components/User/action';
import {
  actionAddMessage,
  actionSetMessages,
} from './components/User/chatSection/actions';

import {
  actionSetBotList,
  actionSetUserList,
} from './components/User/members/action';

const serverAdress = process.env.REACT_APP_SERVER_ADRESS ? process.env.REACT_APP_SERVER_ADRESS : 'http://localhost';
const defaultValue = {
  connected: false,
  connecting: false,
  errorAuth: '',
  socket: null,
  socketOpened: false,
  loginIn: () => {},
  logOut: () => {},
};

const socketContext = createContext(defaultValue);

export const useSocket = () => useContext(socketContext);

const getPosition = () => new Promise((resolve) => {
  const defaultPosition = { latitude: 48.8534, longitude: 2.3488 };
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      const position = { latitude, longitude };
      resolve(position);
    }, (error) => {
      console.error(error);
      resolve(defaultPosition);
    }, {
      enableHighAccuracy: true
    });
  } else {
    resolve(defaultPosition);
  }
});

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [errorAuth, setErrorAuth] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (socket !== null && socket.connected) {

      return () => {
        console.log('Socket closed');
        socket.close();
      };
    }
  }, [socket]);

  const logOut = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('description');
    localStorage.removeItem('connectionId');

    dispatch(actionUserSetName(''));
    dispatch(actionUserSetDescription(''));
    if (socket) {
      socket.close();
    }

    history.push('/');
  }, [dispatch, history, socket]);

  const loginIn = useCallback(async (username, description, connectionId = '') => {
    if (!connecting) {
      setConnecting(true);
      const { latitude, longitude }  = await getPosition();
      const socket = io(serverAdress, {
        query: {
          username,
          description,
          latitude,
          longitude,
          connectionId,
        },
        transports: ['websocket', 'polling']
      });

      localStorage.setItem('username', username);
      localStorage.setItem('description', description);

      dispatch(actionUserSetName(username));
      dispatch(actionUserSetDescription(description));
      socket.on('connect', () => {
        setConnected(true);
        setConnecting(false);
        history.push('/user');
      });

      socket.on('users', (users) => {
        dispatch(actionSetUserList(users));
      });

      socket.on('bots', (bots) => {
        dispatch(actionSetBotList(bots));
      });

      socket.on('messages', (messages) => {
        dispatch(actionSetMessages(messages));
      });

      socket.on('message', (message) => {
        dispatch(actionAddMessage(message));
      });

      socket.on('success-authent', (connectionId) => {
        setErrorAuth('');
        localStorage.setItem('connectionId', connectionId);
      });

      socket.on('error-authent', (error) => {
        setErrorAuth(error);
        localStorage.removeItem('username');
        localStorage.removeItem('description');
      });

      socket.on('disconnect', (reason) => {
        console.log('reason', reason);
        logOut();
      });

      setSocket(socket);
    }
  }, [connecting, dispatch, history, logOut]);

  return (
    <socketContext.Provider
      value={{
        connected,
        connecting,
        errorAuth,
        socket,
        socketOpened: socket !== null && socket.connected,
        loginIn,
        logOut,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
