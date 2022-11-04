import React from 'react';

import NoData from '../../common/NoData';
import { extractScanTypes } from '../../../helpers/xnat';

import RexaCard from '../../common/RexaCard';
import classes from './project.module.scss';
import { Scan } from '../../../models/project/Scan';
import { ScanByType } from '../../../helpers/type/ScanByType';
import ScanTypePieChart from '../../chart/ScanTypePieChart';

interface ScanTypesDetailsProps {
    scans: Scan[];
}

function ScanTypesDetails({ scans }: ScanTypesDetailsProps) {
    let scansByType: ScanByType[] = [];
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
}

export default ScanTypesDetails;
