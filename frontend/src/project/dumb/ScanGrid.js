import React from 'react';
import PropTypes from 'prop-types';

import {Grid} from '@material-ui/core';
import {getUnusableScans} from "../../utils/xnat";
import {ScanTypesDetails} from "./ScanTypesDetails";
import {UnusableScans} from "./UnusableScans";

export const ScanGrid = ({ scans }) => {
    let unusableScans = getUnusableScans(scans);

    return (
        <>
            <Grid item md={unusableScans.length > 0 ? 6 : 9} xs={12}>
                <ScanTypesDetails scans={scans}/>
            </Grid>
            {unusableScans.length > 0 && (
                <Grid item md={3} xs={12}>
                    <UnusableScans unusableScans={unusableScans} />
                </Grid>
            )}

        </>
    );
};

ScanGrid.propTypes = {
    scans: PropTypes.array.isRequired,
};
