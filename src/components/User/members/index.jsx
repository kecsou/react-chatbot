import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

const useStyle = makeStyles((theme) => ({
  botListItem: {
    height: '50px',
    justifyContent: 'center',
    flexDirection: 'column',
    display: 'flex',
    color: theme.palette.text.primary,
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

const ItemMemberList = ({ name = '', description = '' }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyle();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
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
        <Typography>{description}</Typography>
      </Popover>
    </>
  );
};

const BotList = () => {
  const {
    botList = [],
    userList = [],
  } = useSelector(selector);

  return (
    <>
      {
        userList.map(({ id, username, description }) => (
          <ItemMemberList
            key={id}
            name={username}
            description={description}
          />
        ))
      }
      {
        botList.map(({ id, name, description }) => 
          (
            <ItemMemberList
              key={id}
              name={name}
              description={description}
            />
          )
        )
      }
    </>
  );
};

export default BotList;
