import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import MessageDescription from './MessageDescription';

const useStyles = makeStyles({
  root: {
    marginTop: '25px',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  poster: {
    display: 'block',
    height: '100%',
    margin: '0 auto',
    width: 'auto',
  },
  title: {
    textAlign: 'left'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  tile: {
    height: 'auto',
    paddingLeft: '30px',
    paddingRight:'30px',
    width: '45%',
  },
});

const ItemPosterContainer = ({ overview = '', poster_path = '', title = '', }) => {
  const classes = useStyles();
  return (
    <GridListTile className={classes.tile}>
      <img
        className={classes.poster}
        src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
        alt={title}
      />
      <GridListTileBar
        title={title}
        subtitle={<span>{overview}</span>}
      />
  </GridListTile>
  );
};

const ItemTMDB = ({ date, from = '', items, name = '', page, total_pages }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        gutterBotto
      >
        The movie database search: 
        <br />
        <MessageDescription date={date} from={from} />
        <br />
        name: {name} | page: {page} | total pages: {total_pages}
      </Typography>
      <GridList className={classes.gridList} cols={2.5}>
        {
          items.map((item) => (
            <ItemPosterContainer
              key={item.id}
              overview={item.overview}
              poster_path={item.poster_path}
              title={item.title}
            />
          ))
        }
      </GridList>
    </div>
  );
};

export default ItemTMDB;
