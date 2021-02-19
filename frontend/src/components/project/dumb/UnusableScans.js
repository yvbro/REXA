import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Card, List, ListItem, Chip } from '@material-ui/core';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import { getXnatUri } from '../../../helpers/xnat';
import classes from './project.module.scss';

import RexaCard from '../../common/RexaCard';

const UnusableScans = ({ unusableScans }) => {
    const { xnatHost } = useSelector((state) => ({
        xnatHost: state.auth.user.xnatHost,
    }));

    return (
        <RexaCard title='Unusable scans' className={classes.card} classNameContent={classes.cardContent}>
            <List className={classes.scrollableList}>
                {unusableScans && unusableScans.map((scan) => (
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
        </RexaCard>
    );
};

UnusableScans.propTypes = {
    unusableScans: PropTypes.array.isRequired,
};

export default UnusableScans;
