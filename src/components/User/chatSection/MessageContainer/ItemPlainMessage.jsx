import React from 'react';
import { makeStyles } from '@material-ui/core';
import { getTextDate } from '../../../../utils';

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
  },
  desc: {
    fontSize: '15px',
    marginTop: '10px',
  },
  descUsername: {
    color: theme.palette.secondary.main,
  }
}));

const ItemPlainMessage = ({ content = '', date = '', from = '' }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span className={classes.content}>{content}</span>
      <br />
      <br />
      <span className={classes.desc}>
        <span>From </span>
        <span className={classes.descUsername}>{from} </span>
        <span>{getTextDate(date)}</span>
      </span>
    </div>
  );
};

export default ItemPlainMessage;
