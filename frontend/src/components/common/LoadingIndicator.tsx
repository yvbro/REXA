import React from 'react';

import { CircularProgress } from '@material-ui/core';

import classes from './common.module.scss';

function LoadingIndicator() {
    return (
        <div className={`${classes.centered} ${classes.loader}`} aria-label="loader">
            <CircularProgress />
        </div>
    );
}

export default LoadingIndicator;
