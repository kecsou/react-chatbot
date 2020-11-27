import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import MessageDescription from './MessageDescription';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
  },
  content: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    fontSize: '20px',
    maxWidth: '25%',
    paddingTop: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '5px',
    textAlign: 'center',
    color: theme.palette.text.primary
  },
}));

const ItemPlainMessage = ({ content = '', date = '', from = '' }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.content}>
      {content}
      </Typography>
      <br />
      <br />
      <MessageDescription date={date} from={from} />
    </div>
  );
};

export default ItemPlainMessage;
