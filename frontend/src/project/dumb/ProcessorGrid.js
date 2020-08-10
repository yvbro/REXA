import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { ProcessorDetails } from './ProcessorDetails';
import { ListUnknownProcessorStatus } from './ListUnknownProcessorStatus';
import { getUnknownProcStatus } from '../../utils/xnat';

export const ProcessorGrid = ({ processors }) => {
    let unknownProcStatus = getUnknownProcStatus(processors);

    return (
        <Grid container spacing={3}>
            <Grid item md={unknownProcStatus.length > 0 ? 9 : 12} xs={12}>
                <ProcessorDetails processors={processors} />
            </Grid>
            {unknownProcStatus.length > 0 && (
                <Grid item md={3} xs={12}>
                    <ListUnknownProcessorStatus unknownStatus={unknownProcStatus} />
                </Grid>
            )}
        </Grid>
    );
};

ProcessorGrid.propTypes = {
    processors: PropTypes.array.isRequired,
};
