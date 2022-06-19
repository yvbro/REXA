import React from 'react';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import theme from './theme/theme.scss';

const useStyles = makeStyles(() => ({
    cardInfoWithRadius: {
        borderRadius: theme.borderRadius,
    },
    alignItemsAndJustifyContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: theme.avatarColor,
    },
    iconDef: {
        fontSize: 80,
    },
}));

interface NoDataProps {
    label: string;
    noRadius: boolean;
}

const NoData = ({ label = '', noRadius = false }: NoDataProps) => {
    const classes = useStyles();

    return (
        <Card className={noRadius ? '' : classes.cardInfoWithRadius}>
            <CardContent className={classes.alignItemsAndJustifyContent}>
                <InfoIcon className={classes.iconDef} />
                <Typography variant="h5" component="h2">
                    {label}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NoData;
