import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import MessageDescription from './MessageDescription';
import './index';
import { getMonthAsString } from '../../../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
    overflow: 'hidden',
  },
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
  title: {
    textAlign: 'left',
    color: theme.palette.secondary.main,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  rootDialogTitile: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  rootDialogContent: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default
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

const DialogTitle = ({ children, onClose, ...other }) => {
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.rootDialogTitile} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const DialogContent = (props) => {
  const classes = useStyles();
  return (
    <MuiDialogContent className={classes.rootDialogContent} {...props} />
  );
};

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

const ItemTMDB = ({ date, from = '', items }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        gutterBotto
      >
        The movie database search: 
        <br />
        <MessageDescription date={date} from={from} />
      </Typography>
      <GridList className="grid-list" cols={2.5}>
        {
          items.map((item) => (
            <ItemPosterContainer
              key={item.id}
              overview={item.overview}
              poster_path={item.poster_path}
              releaseDate={item.release_date}
              title={item.title}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
            />
          ))
        }
      </GridList>
    </div>
  );
};

export default ItemTMDB;
