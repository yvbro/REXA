import React from 'react';
import PropTypes from 'prop-types';

import {
    makeStyles,
    Card,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import LabelOffIcon from '@material-ui/icons/LabelOff';

import classes from './project.module.scss';

const useStyles = makeStyles({
    cardInfo: {
        borderRadius: '16px',
        height: '365px',
    },
});

const ListUnknownProcessorStatus = ({ unknownStatus }) => {
    const style = useStyles();

    return (
        <>
            <h3>Unknown Processing status</h3>
            <Card className={style.cardInfo}>
                <List className={classes.scrollableList}>
                    {unknownStatus &&
                        unknownStatus.map((status) => (
                            <ListItem key={status}>
                                <ListItemIcon>
                                    <LabelOffIcon />
                                </ListItemIcon>
                                <ListItemText primary={status} />
                            </ListItem>
                        ))}
                </List>
            </Card>
        </>
    );
};

ListUnknownProcessorStatus.propTypes = {
    unknownStatus: PropTypes.array.isRequired,
};

export default ListUnknownProcessorStatus;
