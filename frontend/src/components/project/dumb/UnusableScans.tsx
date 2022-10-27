import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { List, ListItem, Chip } from '@material-ui/core';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import { getXnatUri } from '../../../helpers/xnat';
import classes from './project.module.scss';

import RexaCard from '../../common/RexaCard';
import { RootState } from '../../../store/store';
import { Scan } from '../../../models/project/Scan';

interface UnusableScansProps {
    unusableScans: Scan[];
}

const UnusableScans = ({ unusableScans }: UnusableScansProps) => {
    const { xnatHost } = useSelector((state: RootState) => ({
        xnatHost: state.auth.user.xnatHost ?? '',
    }));

    console.log(unusableScans);

    return (
        <RexaCard
            title="Unusable scans"
            className={classes.card}
            classNameContent={classes.cardContent}
        >
            <List className={classes.scrollableList}>
                {unusableScans &&
                    unusableScans.map((scan) => (
                        <ListItem key={`${scan.id}.${scan.scanLabel}`}>
                            <Chip
                                icon={<MoodBadIcon />}
                                label={`${scan.scanLabel} on ${scan.sessionLabel}`}
                                clickable
                                color="primary"
                                component="a"
                                href={getXnatUri(xnatHost, scan.id)}
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

export default UnusableScans;
