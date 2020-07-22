import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
} from '@material-ui/core';
import ScanUnusablePieChart from '../../chart/ScanUnusablePieChart';
import { extractUnusableScanTypes } from '../../utils/xnat';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    cardInfo: {
        width: 500,
        height: 350,
        borderRadius: '16px',
    },
});

export const ProjectScanUnusable = ({ scans }) => {
    const classes = useStyles();

    let unusableScans = [];
    if (scans) {
        unusableScans = extractUnusableScanTypes(scans);
    }

    return (
        <>
            <h3>Scan types unusables</h3>
            <Card className={classes.cardInfo}>
                <ScanUnusablePieChart unusableScans={unusableScans}/>
            </Card>
        </>
    );
};

ProjectScanUnusable.propTypes = {
    scans: PropTypes.array.isRequired,
};
