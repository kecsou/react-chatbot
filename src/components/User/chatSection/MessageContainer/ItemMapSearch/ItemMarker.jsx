import React, { useCallback, useState } from 'react';
import { makeStyles, Typography, Tooltip, Dialog, Chip } from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { DialogContent, DialogTitle } from '../../../../Dialog/Dialog';
import { reduceByGroup } from '../../../../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    marginBottom: 15
  },
  votes: {
    position: 'relative',
    left: 10,
    bottom: 5,
  },
  paper: {
    minWidth: 500,
  },
  itemChip: {
    marginTop: 10,
    width: '20%',
  },
  box: {
    marginTop: 15,
  },
  open: {
    color: theme.palette.secondary.main,
  },
  name: {
    width: '95%',
  },
  rowType: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
}));

const ItemMarker = ({
  address = '',
  icon = '',
  rate = 0,
  name = '',
  numberRate = 0,
  internationalPhoneNumber = '',
  openNow = true,
  openingWeekDays = [],
  types = [],
}) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const classes = useStyles();

  const typesGroupe = types.reduce(reduceByGroup(4), []);
  return (
    <div style={{ cursor: 'pointer' }}>
      <Tooltip title={name} arrow>
        <img
          alt='icon'
          onClick={handleClickOpen}
          src={icon}
          width={20}
        />
      </Tooltip>
      <Dialog
        aria-labelledby="customized-dialog-title"
        className={classes.dialog}
        onClose={handleClose}
        open={open}
        classes={{
          paper: classes.paper
        }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography className={classes.name} component="h4" variant="h4">{name}</Typography>

          {
            address !== '' && (
              <Typography>
                {address}
              </Typography>
            )
          }

          <Typography className={classes.open} component="p" variant="p">
          {
            openNow ? "Open" : "Closed"
          }
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {
            internationalPhoneNumber !== '' && (
              <Typography>Phone number: {internationalPhoneNumber}</Typography>
            )
          }

          {
            typesGroupe.length > 0 && (
              <>
                <Typography component="h5" variant="h5">Categories</Typography>
                <div style={{ display:'flex', flexWrap: 'wrap' }}>
                {
                  typesGroupe.map((group = [], index) => {
                    return (
                      <div 
                        key={group.reduce((key, current) => `${key}¤¤${current}`, '')}
                        style={classes.rowType}
                      >
                        {
                          group.map((type) => (
                            <Chip
                              key={type}
                              label={<Typography>{type.replace(/_/g, ' ')}</Typography>}
                              className={classes.itemChip}
                              color={index % 2 === 0 ? "primary" : "secondary"}
                            />
                          ))
                        }
                      </div>
                    );
                  })
                }
                </div>
              </>
            )
          }
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.box}>
            <Rating name="read-only" value={rate} readOnly precision={0.01} />
            <Typography className={classes.votes}>
              {numberRate} Votes
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemMarker;
