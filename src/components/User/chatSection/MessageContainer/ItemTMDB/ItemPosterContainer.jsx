import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'

import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import '../index';
import { getMonthAsString } from '../../../../../utils';
import { DialogContent, DialogTitle } from '../../../../Dialog/Dialog';

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: 'rgba(17, 86, 123, 0.3)',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  gridListTile: {
    height: 'auto',
    paddingRight: 30,
  },
  poster: {
    height: '100%',
    width: 'auto',
    cursor: 'pointer',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  votes: {
    position: 'relative',
    left: 10,
    bottom: 5,
  },
  box: {
    marginTop: 15,
  },
  releaseDate: {
    color: theme.palette.secondary.main
  }
}));

const ItemPosterContainer = ({
  overview = '',
  poster_path = '',
  releaseDate = '',
  title = '',
  voteAverage = '',
  voteCount = '',
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const date = useMemo(() => new Date(releaseDate), [releaseDate]);

  return (
    <GridListTile className={classes.gridListTile}>
      <img
        alt={title}
        className={classes.poster}
        draggable="false"
        onClick={handleClickOpen}
        src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
      />

      <Dialog
        aria-labelledby="customized-dialog-title"
        className={classes.dialog}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
          <Typography component="p">
            Release
            {'   '}
            <span className={classes.releaseDate}>{getMonthAsString(date.getMonth() + 1)}  {date.getFullYear()}</span>
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {overview}
          </Typography>
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.box}>
            <Rating name="read-only" value={voteAverage/2} readOnly precision={0.01} />
            <Typography className={classes.votes}>
              {voteCount} Votes
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
  </GridListTile>
  );
};

export default ItemPosterContainer;
