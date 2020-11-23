import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MessageDescription from './MessageDescription';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginTop: '25px',
    position: 'relative',
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
    color: theme.palette.secondary.main,
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

const Bubble = ({ title = '', value = '' }) => {
  return (
    <div style={{ width: 50, height: 50, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 3 }}>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

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
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.townName}
          gutterBottom
          variant="h5"
          component="h2"
        >{query}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Grid container>
          <Grid container item xs={6}>
            <p>Humidity {humidity}</p>
          </Grid>
          <Grid container item xs={6}>
            <p>Localtime {localDate.getHours()}:{localDate.getMinutes()}</p>
          </Grid>
          <Grid container item xs={6}>
            <p>Temperatur {temperature}</p>
          </Grid>
          <Grid container item xs={6}>
            <p>Win speed {windSpeed}</p>
          </Grid>
        </Grid>
        <img
          className={classes.weatherIcon}
          src={weatherIcon}
        />
        <br />
        <MessageDescription date={date} from={from}/>
      </CardContent>
    </Card>
  );
};

export default ItemWeatherstack;
