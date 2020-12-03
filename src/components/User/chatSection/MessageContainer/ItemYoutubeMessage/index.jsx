import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import MessageDescription from '../MessageDescription';
import ItemVideoContainer from './ItemVideoContainer';

const useStyles = makeStyles({
  root: {
    marginTop: '25px'
  },
  gridList: {
    width: '100%',
    height: 'auto',
    marginBottom: 15,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const ItemYoutubeMessage = ({
  by = '',
  date,
  from = '',
  query = '',
  items = []
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">{query}</ListSubheader>
        </GridListTile>
        {
          items.map((item) => (
            <ItemVideoContainer
              description={item.description}
              from={item.from}
              key={item.id}
              videoId={item.id}
            />
          ))
        }
      </GridList>
      <MessageDescription
        by={by}
        date={date}
        from={from}
      />
    </div>
  );
};

export default ItemYoutubeMessage;
