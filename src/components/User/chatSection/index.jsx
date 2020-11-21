import React, { useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Grid, Input, makeStyles } from '@material-ui/core';

import MessageContainer from './MessageContainer/index';
import { useSocket } from '../../../SocketContext';

import './index.css';

const useStyle = makeStyles({
  root: {
    height: '100%',
  },
  input: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  form: {
    height: '5%',
  },
  formContainer: {
    height: '95%',
    overflow: 'auto',
  },
});

const selector = ({ user: { name } }) => ({ name });

const ChatSection = () => {

  const classes = useStyle();
  
  const dispatch = useDispatch();
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
    [currentMessage, dispatch, name, socket],
  );

  return (
    <Grid
      className={classes.root}
      item
      xl={9}
      lg={9}
      md={9}
      xs={10}
    >
      <MessageContainer />
      <form className={classes.form} onSubmit={toggleOnSubmit}>
        <Input
          className={classes.input}
          onChange={toggleOnValueChangeInput}
          value={currentMessage}
          placeholder="Envoyer un message"
        />
      </form>
    </Grid>
  );
};


export default ChatSection;
