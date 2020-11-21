import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';

import { io } from 'socket.io-client';
import { actionSetMessages } from './components/User/chatSection/actions';
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

  useEffect(() => {
    if (socket !== null && socket.connected) {

      return () => {
        console.log('Socket closed');
        socket.close();
      };
    }
  }, [socket]);

  const loginIn = useCallback((username, description) => {
    return new Promise((resolve) => {
      const socket = io(serverAdress, {
        query: {
          username,
          description,
          latitude: 0,
          longitude: 0,
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

      setSocket(socket);
    });
  }, [dispatch]);

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
