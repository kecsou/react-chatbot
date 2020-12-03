import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList';
import MessageDescription from '../MessageDescription';
import ItemPosterContainer from './ItemPosterContainer';

import './index';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
    overflow: 'hidden',
  },
  title: {
    textAlign: 'left',
    color: theme.palette.secondary.main,
  },
}));

const ItemTMDB = ({ by = '', date, from = '', items }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className="grid-list" cols={2.5}>
        {
          items.map((item) => (
            <ItemPosterContainer
              key={item.id}
              overview={item.overview}
              poster_path={item.poster_path}
              releaseDate={item.release_date}
              title={item.title}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
            />
          ))
        }
      </GridList>
      <MessageDescription by={by} date={date} from={from} />
    </div>
  );
};

export default ItemTMDB;
