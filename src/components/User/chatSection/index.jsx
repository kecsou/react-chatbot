import React, { useState, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { Input, makeStyles } from '@material-ui/core';

import MessageContainer from './MessageContainer/index';
import { useSocket } from '../../../SocketContext';

import './index.css';

const useStyle = makeStyles({
  root: {
    height: '100%',
    width: '100%',
  },
  input: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

const selector = ({ user: { name } }) => ({ name });

const ChatSection = () => {
  const classes = useStyle();
  const {
    socket
  } = useSocket();

  const { name } = useSelector(selector);

  const [currentMessage, setCurrentMessage] = useState('');
  const toggleOnValueChangeInput = useCallback((e) => {
    setCurrentMessage(e.target.value);
  }, []);

  const toggleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (currentMessage.trim() !== '') {
        const messageDTO = {
          from: name,
          content: currentMessage,
        };
        socket.emit('message-send', messageDTO);
        setCurrentMessage('');
      }
    },
    [currentMessage, name, socket],
  );

  return (
    <div className={classes.root}>
      <MessageContainer />
      <form className={classes.form} onSubmit={toggleOnSubmit}>
        <Input
          className={classes.input}
          onChange={toggleOnValueChangeInput}
          value={currentMessage}
          placeholder="Envoyer un message"
        />
      </form>
    </div>
  );
};


export default ChatSection;
