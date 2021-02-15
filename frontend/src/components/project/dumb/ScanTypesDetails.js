import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import ScanTypePieChart from '../../chart/ScanTypePieChart';
import NoData from '../../common/NoData';
import { extractScanTypes } from '../../../helpers/xnat';

const useStyles = makeStyles({
    cardInfo: {
        borderRadius: '16px',
    },
});

const ScanTypesDetails = ({ scans }) => {
    const classes = useStyles();

    let scansByType = [];
    if (scans) {
        scansByType = extractScanTypes(scans);
    }
    return (
        <>
            <h3>Scan types</h3>
            <Card className={classes.cardInfo}>
                {scansByType && scansByType.length > 0 ? (
                    <ScanTypePieChart scans={scansByType} />
                ) : (
                    <NoData label="No scan found" />
                )}
            </Card>
        </>
    );
};

ScanTypesDetails.propTypes = {
    scans: PropTypes.array.isRequired,
};

export default ScanTypesDetails;
