import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/core/styles';
import {
    Card,
} from '@material-ui/core';
import ScanUnusablePieChart from '../../chart/ScanUnusablePieChart';
import {extractUnusableScanTypes} from '../../utils/xnat';
import {NoScansUnusable} from "./NoScansUnsusable";

const useStyles = makeStyles({
    cardInfo: {
        borderRadius: '16px',
    },
});

export const ProjectScanUnusable = ({scans}) => {
    const classes = useStyles();

    let unusableScans = [];
    if (scans) {
        unusableScans = extractUnusableScanTypes(scans);
    }

    return (
        <>
            <h3>Scan types unusables</h3>
            <Card className={classes.cardInfo}>
                {unusableScans && unusableScans.length > 0 ? (
                    <ScanUnusablePieChart unusableScans={unusableScans}/>
                ) : (
                    <NoScansUnusable/>
                )
                }
            </Card>
        </>
    );
};

ProjectScanUnusable.propTypes = {
    scans: PropTypes.array.isRequired,
};
