import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import './index.css';

const selector = ({ members: { botList } }) => ({ botList });

const BotList = () => {
  const { botList = [] } = useSelector(selector);

  return (
    <Grid
      item
      xl={3}
      lg={3}
      md={3}
      xs={2}
    >
      {
        botList.map(({ id, name, description }) => 
          (
            <div key={id} className="bot-list-item">
              <p>{name}</p>
              <p>{description}</p>
            </div>
          )
        )
      }
    </Grid>
  );
};

export default BotList;
