import React from 'react';
import { makeStyles } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import MessageDescription from '../MessageDescription';
import ItemMarker from './ItemMarker';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '50%',
    width: 'calc(100% - 40px)',
    paddingTop: 20,
    paddingRight: 20,
    marginBottom: 15,
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: 'left'
  },
}));

const ItemMapSearch = ({
  apiKey = '',
  by = '',
  date = '',
  items = [],
  from = '',
  lat = 0,
  lng = 0, 
}) => {
  const classes = useStyles();

  const center = {
    lat,
    lng
  };

  return (
    <>
      <div className={classes.root}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={center}
          defaultZoom={11}
        >
          {
            items.map((item) => {
              return (
                <ItemMarker
                  address={item.address}
                  key={item.id}
                  icon={item.icon}
                  lat={item.lat}
                  lng={item.lng}
                  rate={item.rate}
                  name={item.name}
                  numberRate={item.numberRate}
                  internationalPhoneNumber={item.internationalPhoneNumber}
                  openNow={item.openNow}
                  openingWeekDays={item.openingWeekDays}
                  types={item.types}
                />
              );
            })
          }
        </GoogleMapReact>
      </div>
      <MessageDescription
        by={by}
        date={date}
        from={from}
      />
    </>
  );
};

export default ItemMapSearch;
