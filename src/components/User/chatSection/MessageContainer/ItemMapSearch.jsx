import React, { useCallback, useState } from 'react';
import { makeStyles, Typography, Tooltip, Dialog, Chip, Grid } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import MessageDescription from './MessageDescription';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { DialogContent, DialogTitle } from '../../../Dialog/Dialog';
import { reduceByGroup } from '../../../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '50%',
    width: 'calc(100% - 40px)',
    padding: 20
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: 'left'
  },
  dialog: {
    backgroundColor: 'rgba(17, 86, 123, 0.3)',
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
  }
}));

const ItemSearchResult = ({
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
          <Typography component="h4" variant="h4">{name}</Typography>

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
                        style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
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

const ItemMapSearch = ({
  apiKey = '',
  by = '',
  date = '',
  items = [],
  from = '',
  lat = 0,
  lng = 0, 
}) => {
  const classes = useStyles();

  const center = {
    lat,
    lng
  };

  return (
    <div className={classes.root}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={11}
      >
        {
          items.map((item) => {
            return (
              <ItemSearchResult
                address={item.address}
                key={item.id}
                icon={item.icon}
                lat={item.lat}
                lng={item.lng}
                rate={item.rate}
                name={item.name}
                numberRate={item.numberRate}
                internationalPhoneNumber={item.internationalPhoneNumber}
                openNow={item.openNow}
                openingWeekDays={item.openingWeekDays}
                types={item.types}
              />
            );
          })
        }
      </GoogleMapReact>
      <MessageDescription
        by={by}
        date={date}
        from={from}
      />
    </div>
  );
};

export default ItemMapSearch;
