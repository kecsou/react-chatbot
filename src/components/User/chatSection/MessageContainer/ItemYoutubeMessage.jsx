import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import YouTube from 'react-youtube';
import Typography from '@material-ui/core/Typography';
import MessageDescription from './MessageDescription';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px'
  },
  gridList: {
    width: '100%',
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: 'left'
  },
  tile: {
    backgroundColor: 'rgba(124, 197, 237, 0.5)',
  },
}));

const ItemVideoContainer = ({ description = '', title = '', videoId = '', }) => {
  const [playing, setPlaying] = useState(false);
  
  const onPlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const onPause = useCallback(() => {
    setPlaying(false);
  }, []);

  const classes = useStyles();

  return (
    <GridListTile style={{ height: 'auto', width: '50%' }}>
      <YouTube
        opts={{width: '100%'}}
        onPlay={onPlay}
        onPause={onPause}
        videoId={videoId}
      />
      {
        !playing && (
          <GridListTileBar
            className={classes.tile}
            title={title}
            subtitle={<span>{description}</span>}
          />
        )
      }
    </GridListTile>
  );
};

const ItemYoutubeMessage = ({
  date,
  from = '',
  query = '',
  items = []
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        gutterBotto
      >
        Youtube search: 
      </Typography>
      <br />
      <MessageDescription date={date} from={from} />
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">{query}</ListSubheader>
        </GridListTile>
        {
          items.map((item) => (
            <ItemVideoContainer
              description={item.description}
              from={item.from}
              key={item.id}
              videoId={item.id}
            />
          ))
        }
      </GridList>
    </div>
  );
};

export default ItemYoutubeMessage;
