import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { themeColor } from '../../helpers/constants/variables.scss';

const useStyles = makeStyles(() => ({
    cardInfoWithRadius: {
        borderRadius: '16px',
    },
    alignItemsAndJustifyContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: themeColor,
    },
    iconDef: {
        fontSize: 80,
    },
}));

const NoData = ({ label, noRadius }) => {
    const classes = useStyles();

    return (
        <Card
            variant="outlined"
            className={noRadius ? '' : classes.cardInfoWithRadius}
        >
            <CardContent className={classes.alignItemsAndJustifyContent}>
                <InfoIcon className={classes.iconDef} />
                <Typography variant="h5" component="h2">
                    {label}
                </Typography>
            </CardContent>
        </Card>
    );
};

NoData.propTypes = {
    label: PropTypes.string,
    noRadius: PropTypes.bool,
};

export default NoData;
