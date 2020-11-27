import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { getTextDate } from '../../../../utils';

const useStyles = makeStyles((theme) => ({
  desc: {
    fontSize: '15px',
    marginTop: '10px',
    color: theme.palette.text.primary,
  },
  descUsername: {
    color: theme.palette.secondary.main,
  }
}));

const MessageDescription = ({ date = '', from = '' }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.desc}>
      <Typography>From </Typography>
      <Typography className={classes.descUsername}>{from} </Typography>
      <Typography>{getTextDate(date)}</Typography>
    </Typography>
  );
};

export default MessageDescription;
