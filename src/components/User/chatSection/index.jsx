import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Input, makeStyles } from '@material-ui/core';

import MessageContainer from './MessageContainer/index';
import { useSocket } from '../../../SocketContext';

import './index.css';
import { actionSetMessageToSend } from './actions';

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

const selector = ({
  chat: { messageToSend },
  user: { name }
}) => ({
  messageToSend,
  name,
});

const ChatSection = () => {
  const classes = useStyle();
  const {
    socket
  } = useSocket();

  const {
    messageToSend,
    name,
  } = useSelector(selector);

  const dispatch = useDispatch();

  const toggleOnValueChangeInput = useCallback((e) => {
    dispatch(actionSetMessageToSend(e.target.value));
  }, [dispatch]);

  const toggleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (messageToSend.trim() !== '') {
        const messageDTO = {
          from: name,
          content: messageToSend,
        };
        socket.emit('message-send', messageDTO);
        dispatch(actionSetMessageToSend(''));
      }
    },
    [dispatch, messageToSend, name, socket],
  );

  return (
    <div className={classes.root}>
      <MessageContainer />
      <form className={classes.form} onSubmit={toggleOnSubmit}>
        <Input
          className={classes.input}
          onChange={toggleOnValueChangeInput}
          value={messageToSend}
          placeholder="Send a message"
        />
      </form>
    </div>
  );
};


export default ChatSection;
