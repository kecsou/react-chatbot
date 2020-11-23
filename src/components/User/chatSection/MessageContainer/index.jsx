import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ItemPlainMessage from './ItemPlainMessage';
import ItemYoutubeMessage from './ItemYoutubeMessage';
import ItemTMDB from './ItemTMDB';
import ItemWeatherstack from './ItemWeatherstack';

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
            case 'tmdb':
              return (
                <ItemTMDB
                  date={item.date}
                  from={item.from}
                  items={item.items}
                  key={item.id}
                  name={item.name}
                  page={item.page}
                  total_pages={item.total_pages}
                />
              );
            case 'weatherstack':
              return (
                <ItemWeatherstack
                  date={item.date}
                  from={item.from}
                  key={item.id}
                  humidity={item.humidity}
                  localtime={item.localtime}
                  query={item.query}
                  temperature={item.temperature}
                  weatherIcon={item.weatherIcon}
                  windSpeed={item.windSpeed}
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
