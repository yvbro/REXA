import React from 'react';
import PropTypes from 'prop-types';

import ScanTypePieChart from '../../chart/ScanTypePieChart';
import NoData from '../../common/NoData';
import { extractScanTypes } from '../../../helpers/xnat';

import RexaCard from '../../common/RexaCard';
import classes from './project.module.scss';

const ScanTypesDetails = ({ scans }) => {
    let scansByType = [];
    if (scans) {
        scansByType = extractScanTypes(scans);
    }

    return (
        <RexaCard title='Scan types' className={classes.card}>
            {scansByType && scansByType.length > 0 ? (
                <ScanTypePieChart scans={scansByType} />
            ) : (
                <NoData label="No scan found" />
            )}
        </RexaCard>
    );
};

ScanTypesDetails.propTypes = {
    scans: PropTypes.array.isRequired,
};

export default ScanTypesDetails;
