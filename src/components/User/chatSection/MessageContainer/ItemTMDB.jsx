import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import MessageDescription from './MessageDescription';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './index';

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
    paddingLeft: 30,
    paddingRight: 30,
  },
  poster: {
    display: 'block',
    height: '100%',
    margin: '0 auto',
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

const ItemPosterContainer = ({ overview = '', poster_path = '', title = '', }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <GridListTile className={classes.gridListTile}>
      <img
        alt={title}
        className={classes.poster}
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
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {overview}
          </Typography>
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
              title={item.title}
            />
          ))
        }
      </GridList>
    </div>
  );
};

export default ItemTMDB;
