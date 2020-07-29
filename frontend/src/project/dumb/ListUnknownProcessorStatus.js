import React from 'react';

import {makeStyles, Card, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import LabelOffIcon from '@material-ui/icons/LabelOff';
import PropTypes from "prop-types";

const useStyles = makeStyles({
    cardInfo: {
        borderRadius: '16px',
    },
});

export const ListUnknownProcessorStatus = ({unknownStatus}) => {
    const classes = useStyles();

    return (
        <>
            <h3>Unknown Processing status</h3>
            <Card className={classes.cardInfo}>
                {unknownStatus && unknownStatus.map(status => (
                <ListItem key={status}>
                            <ListItemIcon>
                                <LabelOffIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={status}
                            />
                </ListItem>)
                )}
            </Card>
        </>
    );
};


ListUnknownProcessorStatus.propTypes = {
    unknownStatus: PropTypes.array.isRequired,
};
