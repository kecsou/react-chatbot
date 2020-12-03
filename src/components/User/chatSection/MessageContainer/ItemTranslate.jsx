import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';

import MessageDescription from './MessageDescription';

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: '25%',
    marginTop: '25px',
    marginBottom: '10px',
    position: 'relative',
    padding: 15,
    backgroundColor: theme.palette.primary.main,
  },
  divider: {
    border: `${theme.palette.background.default} solid 1px`
  }
}));

const ItemTranslate = ({
  by = '',
  date = '',
  from = '',
  translations = [],
  source = '',
}) => {

  const classes = useStyle();
  return (
    <div>
      <Card className={classes.root}>
        <Typography>Source: {source}</Typography>
        <hr className={classes.divider} />
        <ul>
          {
            translations.map((translation) => 
              <li>
                <Typography>- {translation}</Typography>
              </li>
            )
          }
        </ul>
      </Card>
      <MessageDescription
        by = {by}
        date={date}
        from={from}
      />
    </div>
  );
};

export default ItemTranslate;
