import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { io } from 'socket.io-client';
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

const selector = ({ user: { description, name } }) => ({ description, name });

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { description, name } = useSelector(selector);

  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (socket !== null && socket.connected) {

      return () => {
        console.log('Socket closed');
        socket.close();
      };
    }
  }, [socket]);

  const loginIn = useCallback(() => {
    return new Promise((resolve) => {
      const socket = io(serverAdress, {
        query: {
          username: name,
          description,
        },
        transports: ['websocket', 'polling']
      });

      socket.on('connect', () => {
        resolve();
        setConnected(true);
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
  }, [description, dispatch, name]);

  const logOut = useCallback(() => {
    
  }, []);

  return (
    <socketContext.Provider
      value={{
        connected,
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
