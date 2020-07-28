import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: '16px',
    },
    alignItemsAndJustifyContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: grey[500],
    },
    iconDef: {
        fontSize: 80,
    },
}));

export const NoProjectData = () => {
    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.card}>
            <CardContent className={classes.alignItemsAndJustifyContent}>
                <InfoIcon className={classes.iconDef} />
                <Typography variant="h5" component="h2">
                    No project selected or no data found !
                </Typography>
            </CardContent>
        </Card>
    );
};
