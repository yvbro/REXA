import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import grey from '@material-ui/core/colors/grey';
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
    cardInfo: {
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

export const UnusableScans = ({unusableScans}) => {
    const classes = useStyles();

    return (
        <>
            <h3>Unusable scans</h3>
            <Card className={classes.cardInfo}>
                <CardContent className={classes.alignItemsAndJustifyContent}>
                    <InfoIcon className={classes.iconDef} />
                    <Typography variant="h5" component="h2">
                        No scans found
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

UnusableScans.propTypes = {
    unusableScans: PropTypes.array.isRequired,
};
