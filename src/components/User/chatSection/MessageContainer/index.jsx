import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ItemPlainMessage from './ItemPlainMessage';
import ItemYoutubeMessage from './ItemYoutubeMessage';

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
        messages.map((item) => {
          switch (item.type) {
            case 'plain':
              return (
                <ItemPlainMessage
                  key={item.id}
                  content={item.content}
                  date={item.date}
                  from={item.from}
                />
              );
            case 'youtube':
              return (
                <ItemYoutubeMessage
                  from={item.from}  
                  items={item.items}
                  key={item.id}
                  type={item.type}
                  query={item.query}
                />
              );

            default:
              return (<div id={item.id}></div>);      
          }
        })
      }
    </div>
  );
};

export default MessageContainer;
