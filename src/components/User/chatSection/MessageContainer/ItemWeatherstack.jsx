import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MessageDescription from './MessageDescription';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginTop: '25px',
    marginBottom: '10px',
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    width: '100px',
    height: '100px',
  },
  infos: {
    paddingTop: '10px',
    paddingLeft: '10px',
    marginBottom: '15px',
  },
  townName: {
    color: theme.palette.text.primary
  },
  weatherIcon: {
    position: 'absolute',
    top: 0,
    right: 0, 
  },
  fab: {
    margin: 10
  },
}));

const ItemWeatherstack = ({
  date = '',
  description = '',
  from = '',
  humidity = 0,
  localtime = '',
  query = '',
  temperature = '',
  weatherIcon = '',
  windSpeed = 0,
}) => {
  const classes = useStyles();
  const localDate = useMemo(() => new Date(localtime), [localtime]);
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.townName}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {query}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Grid container>
            <Grid container item xs={6}>
              <Typography>Humidity {humidity}</Typography>
            </Grid>
            <Grid container item xs={6}>
              <Typography>Localtime {localDate.getHours()}:{localDate.getMinutes()}</Typography>
            </Grid>
            <Grid container item xs={6}>
              <Typography>Temperatur {temperature}</Typography>
            </Grid>
            <Grid container item xs={6}>
              <Typography>Win speed {windSpeed}</Typography>
            </Grid>
          </Grid>
          <img
            alt="Can not get weather state"
            className={classes.weatherIcon}
            draggable={false}
            src={weatherIcon}
          />
          <br />
        </CardContent>
      </Card>
      <MessageDescription date={date} from={from}/>
    </>
  );
};

export default ItemWeatherstack;
