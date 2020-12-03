import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ItemPlainMessage from './ItemPlainMessage';
import ItemYoutubeMessage from './ItemYoutubeMessage/index';
import ItemTMDB from './ItemTMDB/index';
import ItemWeatherstack from './ItemWeatherstack';

import './index.css';
import ItemTranslate from './ItemTranslate';
import ItemWhereAmI from './ItemWhereAmI';
import ItemMapSearch from './ItemMapSearch/index';
import ItemNoResultFound from './ItemNoResultFound';
import ItemUnexpectedError from './ItemUnexpectedError';

const useStyle = makeStyles({
  root: {
    height: '100%',
  },
  input: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  messageContainer: {
    height: 'calc(100% - 35px)',
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
      id="message-container"
      className={classes.messageContainer}
      data-simplebar
      ref={imageContainerRef}
    >
      {
        messages.map((item) => {
          switch (item.type) {
            case 'plain':
              return (
                <ItemPlainMessage
                  by={item.by}
                  key={item.id}
                  content={item.content}
                  date={item.date}
                  from={item.from}
                />
              );

            case 'youtube':
              return (
                <ItemYoutubeMessage
                  by={item.by}
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
                  by={item.by}
                  date={item.date}
                  from={item.from}
                  items={item.items}
                  key={item.id}
                  name={item.name}
                />
              );

            case 'weatherstack':
              return (
                <ItemWeatherstack
                  by={item.by}  
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

            case 'translation':
              return (
                <ItemTranslate
                  by={item.by}  
                  date={item.date}
                  from={item.from}
                  key={item.id}
                  translations={item.translations}
                  source={item.source}
                />
              );

            case 'whereami':
              return (
                <ItemWhereAmI
                  by={item.by}
                  apiKey={item.apiKey}
                  date={item.date}
                  from={item.from}
                  key = {item.id}
                  lat={item.lat}
                  lng={item.lng}
                />
              );

            case 'mapsearch':
              return (
                <ItemMapSearch
                  apiKey={item.apiKey}
                  by={item.by}
                  date={item.date}  
                  items={item.items}
                  key={item.id}
                  from={item.from}
                  lat={item.lat}
                  lng={item.lng}
                />
              );

            case 'noresultfound':
              return (
                <ItemNoResultFound
                  by={item.by}
                  date={item.date}  
                  key={item.id}
                  from={item.from}
                  query={item.query}
                />
              );

            case 'unexpectederror':
              return (
                <ItemUnexpectedError
                  by={item.by}
                  date={item.date}  
                  key={item.id}
                  from={item.from}
                  query={item.query}
                />
              );

            default:
              return (<div key={item.id}></div>);      
          }
        })
      }
    </div>
  );
};

export default MessageContainer;
