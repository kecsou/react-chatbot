import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MessageDescription from './MessageDescription';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop: '25px'
  },
  icon: {
    width: '100px',
    height: '100px',
  },
  infos: {
    paddingTop: '10px',
    paddingLeft: '10px',
    marginBottom: '15px',
  }
});

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
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{query}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Paper className={classes.infos}>
            <p>Humidity: {humidity}</p>
            <p>Localtime: {localDate.getHours()}:{localDate.getMinutes()}</p>
            <p>Temperatur: {temperature} degrés</p>
            <p>Win speed: {windSpeed}</p>
          </Paper>
          <MessageDescription date={date} from={from}/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemWeatherstack;
