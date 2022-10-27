import React from 'react';
import PropTypes from 'prop-types';

import ScanTypePieChart from '../../chart/ScanTypePieChart';
import NoData from '../../common/NoData';
import { extractScanTypes } from '../../../helpers/xnat';

import RexaCard from '../../common/RexaCard';
import classes from './project.module.scss';
import { Scan } from '../../../models/project/Scan';

interface ScanTypesDetailsProps {
    scans: Scan[];
}

const ScanTypesDetails = ({ scans }: ScanTypesDetailsProps) => {
    let scansByType = [];
    if (scans) {
        scansByType = extractScanTypes(scans);
    }

    return (
        <RexaCard title="Scan types" className={classes.card}>
            {scansByType && scansByType.length > 0 ? (
                <ScanTypePieChart scans={scansByType} />
            ) : (
                <NoData label="No scan found" />
            )}
        </RexaCard>
    );
};

export default ScanTypesDetails;
