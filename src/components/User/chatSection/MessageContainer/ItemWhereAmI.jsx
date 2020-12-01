import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import MessageDescription from './MessageDescription';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
    marginBottom: '10px',
    position: 'relative',
  },
  username: {
    color: theme.palette.secondary.main,
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: 'left'
  }
})
);

const ItemWhereAmI = ({
  apiKey = '',
  date = '',
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
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        gutterBottom
      >
        Where am I: 
      </Typography>
      <Grid container style={{ height: 200, marginBottom: 15 }}>
        <Grid item xs={4}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={center}
            defaultZoom={11}
          >
          <img
              alt="Marker"
              lat={lat}
              lng={lng}
              src="marker.svg"
              width={50}
              text="test"
            />
          </GoogleMapReact>
        </Grid>
      </Grid>
      <MessageDescription
        date={date}
        from={from}
      />
    </div>
  );
};

export default ItemWhereAmI;
