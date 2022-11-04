import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import UnknownProcessorStatus from './UnknownProcessorStatus';
import { getUnknownProcStatus } from '../../../helpers/xnat';
import RexaCard from '../../common/RexaCard';

import classes from './project.module.scss';
import { Assessor } from '../../../models/project/Assessor';
import StackedProjectColumnChart from '../../chart/StackedProjectColumnChart';

interface ProcessorGridProps {
    processors: Assessor[];
}

function ProcessorGrid({ processors }: ProcessorGridProps) {
    const unknownProcStatus = getUnknownProcStatus(processors);

    return (
        <Grid container spacing={3}>
            <Grid item md={unknownProcStatus.length > 0 ? 9 : 12} xs={12}>
                <RexaCard title="Processor Board" className={classes.cardExtra}>
                    <StackedProjectColumnChart assessors={processors} />
                </RexaCard>
            </Grid>
            {unknownProcStatus.length > 0 && (
                <Grid item md={3} xs={12}>
                    <UnknownProcessorStatus unknownStatus={unknownProcStatus} />
                </Grid>
            )}
        </Grid>
    );
}

export default ProcessorGrid;
