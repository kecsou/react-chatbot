import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles'

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import YouTube from 'react-youtube';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: 'auto',
    width: '50%',
    paddingRight:'25px',
    paddingTop:'25px',
  },
  gridList: {
    width: '100%',
    height: 'auto',
    marginBottom: 15,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

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
    <GridListTile className={classes.root}>
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
            subtitle={<Typography>{description}</Typography>}
          />
        )
      }
    </GridListTile>
  );
};

export default ItemVideoContainer;
