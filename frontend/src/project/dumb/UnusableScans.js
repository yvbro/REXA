import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Card, List, ListItem, Chip } from '@material-ui/core';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import { getXnatUri } from '../../utils/xnat';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    cardInfo: {
        borderRadius: '16px',
        height: '350px',
    },
    listScrollable: {
        maxHeight: '100%',
        overflow: 'auto',
    },
}));

export const UnusableScans = ({ unusableScans }) => {
    const classes = useStyles();

    const { xnatHost } = useSelector((state) => ({
        xnatHost: state.settings.xnatHost,
    }));

    return (
        <>
            <h3>Unusable scans</h3>
            <Card className={classes.cardInfo}>
                <List className={classes.listScrollable}>
                    {unusableScans &&
                        unusableScans.map((scan) => (
                            <ListItem
                                key={`${scan.ID}.${scan['xnat:imagescandata/id']}`}
                            >
                                <Chip
                                    icon={<MoodBadIcon />}
                                    label={`${scan['xnat:imagescandata/id']} on ${scan['label']}`}
                                    clickable
                                    color="primary"
                                    component="a"
                                    href={getXnatUri(xnatHost, scan.ID)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="outlined"
                                />
                            </ListItem>
                        ))}
                </List>
            </Card>
        </>
    );
};

UnusableScans.propTypes = {
    unusableScans: PropTypes.array.isRequired,
};
