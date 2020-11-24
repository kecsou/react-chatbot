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

const serverAdress = 'http://localhost';
const defaultValue = {
  connected: false,
  connecting: false,
  socket: null,
  socketOpened: false,
  loginIn: () => {},
  logOut: () => {},
};

const socketContext = createContext(defaultValue);

export const useSocket = () => useContext(socketContext);

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (socket !== null && socket.connected) {

      return () => {
        console.log('Socket closed');
        socket.close();
      };
    }
  }, [socket]);

  const loginIn = useCallback((username, description) => {
    setConnecting(true);
    return new Promise((resolve) => {
      const socket = io(serverAdress, {
        query: {
          username,
          description,
        },
        transports: ['websocket', 'polling']
      });

      localStorage.setItem('username', username);
      localStorage.setItem('description', description);

      dispatch(actionUserSetName(username));
      dispatch(actionUserSetDescription(description));
      socket.on('connect', () => {
        resolve();
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

      setSocket(socket);
    });
  }, [dispatch, history]);

  const logOut = useCallback(() => {
    localStorage.setItem('username', '');
    localStorage.setItem('description', '');

    dispatch(actionUserSetName(''));
    dispatch(actionUserSetDescription(''));
    socket.close();
    history.push('/');
  }, [dispatch, history, socket]);

  return (
    <socketContext.Provider
      value={{
        connected,
        connecting,
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
