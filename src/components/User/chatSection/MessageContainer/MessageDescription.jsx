import React from 'react';
import { makeStyles } from '@material-ui/core';
import { getTextDate } from '../../../../utils';

const useStyles = makeStyles((theme) => ({
  desc: {
    fontSize: '15px',
    marginTop: '10px',
  },
  descUsername: {
    color: theme.palette.secondary.main,
  }
}));

const MessageDescription = ({ date = '', from = '' }) => {
  const classes = useStyles();
  return (
    <span className={classes.desc}>
      <span>From </span>
      <span className={classes.descUsername}>{from} </span>
      <span>{getTextDate(date)}</span>
    </span>
  );
};

export default MessageDescription;
