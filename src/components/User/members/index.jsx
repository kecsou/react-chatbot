import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { actionSetMessageToSend } from '../chatSection/actions';

const useStyle = makeStyles((theme) => ({
  botListItem: {
    height: '50px',
    justifyContent: 'center',
    flexDirection: 'column',
    display: 'flex',
    color: theme.palette.text.primary,
    paddingLeft: 15,
  },
  title: {
    color: '#FFF',
    paddingLeft: 15,
  },
  username: {
    color: theme.palette.secondary.main
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
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

const ItemMemberList = ({ name = '', description = '', isBot = false }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyle();

  const dispatch = useDispatch();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClick = useCallback(() => {
    if (!isBot) {
      return;
    }

    dispatch(actionSetMessageToSend(description));

  }, [description, dispatch, isBot]);

  const open = Boolean(anchorEl);

  return (
    <div
      onClick={handleClick}
      style={{ cursor: isBot ? 'pointer' : 'default' }}
    >
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        className={classes.botListItem}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Typography className={classes.username}>{name}</Typography>
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>
          {description}
          {
            isBot && (
              <>
                <br />
                (Click to use this template)
              </>
            )
          }
        </Typography>
      </Popover>
    </div>
  );
};

const BotList = () => {
  const {
    botList = [],
    userList = [],
  } = useSelector(selector);

  const classes = useStyle();

  return (
    <>
      <Typography className={classes.title} component="h5" variant="h5">Users</Typography>
      {
        userList.map(({ id, username, description }) => (
          <ItemMemberList
            key={id}
            name={username}
            description={description}
          />
        ))
      }
      <Typography className={classes.title} component="h5" variant="h5" >Bots</Typography>
      {
        botList.map(({ id, name, description }) => 
          (
            <ItemMemberList
              key={id}
              name={name}
              description={description}
              isBot
            />
          )
        )
      }
    </>
  );
};

export default BotList;
