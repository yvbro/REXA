import React from 'react';

import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
}));

const LoadingIndicator = () => {
    const classes = useStyles();

    return (
        <div className={classes.loader}>
            <CircularProgress />
        </div>
    );
};

export default LoadingIndicator;
