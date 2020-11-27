import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  botListItem: {
    width: '100%',
    height: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
    color: theme.palette.text.primary,
  },
  username: {
    color: theme.palette.secondary.main
  }
}));

const selector = ({
  members: {
    botList,
    userList,
  },
}) => ({
  botList,
  userList
});

const BotList = () => {
  const {
    botList = [],
    userList = [],
  } = useSelector(selector);

  const classes = useStyle();

  return (
    <Grid
      item
      xl={3}
      lg={3}
      md={3}
      xs={2}
    >
      {
        userList.map(({ id, username, description }) => (
          <Typography key={id} className={classes.botListItem}>
            <p className={classes.username}>{username}</p>
            <p>{description}</p>
          </Typography>
        ))
      }
      {
        botList.map(({ id, name, description }) => 
          (
            <div key={id} className={classes.botListItem}>
              <Typography className={classes.username}>{name}</Typography>
              <Typography>{description}</Typography>
            </div>
          )
        )
      }
    </Grid>
  );
};

export default BotList;
