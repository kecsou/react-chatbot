import React, { useCallback } from 'react';
import {
    Button,
    Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    codeError: {
        color:  theme.palette.secondary.main,
        fontSize: 100,
    },
    messageError: {
        color: theme.palette.text.primary,
        fontSize: 50
    }
}));

const NotFound = () => {
    const classes = useStyles();

    const history = useHistory();
    const goToLogin = useCallback(() =>  {
        history.push('/');
    }, [history]);

    return (
        <div className={classes.root}>
            <Typography className={classes.codeError}>
                404
            </Typography>

            <Typography className={classes.messageError}>
                Page not found
            </Typography>
            <Button
                color="primary"
                variant="contained"
                onClick={goToLogin}
            >
            Go to login page
          </Button>
        </div>
    );
}

export default NotFound;
