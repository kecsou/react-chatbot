import React from 'react';

import { Typography } from '@material-ui/core';
import MessageDescription from './MessageDescription';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    borderRadius: 10,
    width: 300
  },
  message: {
    color: theme.palette.text.primary,
  },
  query: {
    color: theme.palette.secondary.main,
  },
}))

const ItemMapSearchNotFound = ({
  by = '',
  date = '',
  from = '',
  query = ''
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Typography className={classes.message}>
          No result found for <Typography className={classes.query}>{query}</Typography>
        </Typography>
      </div>
      <MessageDescription
        by={by}
        date={date}
        from={from}
      />
    </>
  );
};

export default ItemMapSearchNotFound;
