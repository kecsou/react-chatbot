import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ItemPlainMessage from './ItemPlainMessage';

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

const selector = ({ chat: { messages } }) => ({ messages });

const MessageContainer = () => {

  const { messages } = useSelector(selector);
  const imageContainerRef = useRef();
  const classes = useStyle();

  useEffect(() => {
    const { current: elt } = imageContainerRef;
    elt.scrollTop = elt.scrollHeight;
  }, [messages]);

  return (
    <div
      className={classes.formContainer}
      ref={imageContainerRef}
    >
      {
        messages.map(({ id, content, date, from, type }) => {
          switch (type) {
            case 'plain':
              return (
                <ItemPlainMessage
                  key={id}
                  content={content}
                  date={date}
                  from={from}
                />
              );

            default:
              return (<></>);      
          }
        })
      }
    </div>
  );
};

export default MessageContainer;
