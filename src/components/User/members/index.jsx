import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';

import './index.css';

const useStyle = makeStyles((theme) => ({
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
          <div key={id} className="bot-list-item">
            <p className={classes.username}>{username}</p>
            <p>{description}</p>
          </div>
        ))
      }
      {
        botList.map(({ id, name, description }) => 
          (
            <div key={id} className="bot-list-item">
              <p className={classes.username}>{name}</p>
              <p>{description}</p>
            </div>
          )
        )
      }
    </Grid>
  );
};

export default BotList;
