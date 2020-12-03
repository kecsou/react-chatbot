import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  rootDialogContent: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default
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
}));

export const DialogTitle = ({ children, onClose = () => {}, ...other }) => {
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

export const DialogContent = (props) => {
  const classes = useStyles();
  return (
    <MuiDialogContent className={classes.rootDialogContent} {...props} />
  );
};
