import React from 'react';
import PropTypes from 'prop-types';

import { Chip } from '@material-ui/core';

import RexaCard from '../../common/RexaCard';
import RexaDataTable from '../../common/RexaDataTable';
import { getXnatUri } from '../../../helpers/xnat';

import classes from './dashboard.module.scss';

const toChip = (label, id, xnatHost) => {
    return (
        <Chip
            label={label}
            clickable
            color="primary"
            component="a"
            href={getXnatUri(xnatHost, id)}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
        />
    );
};

const RecentActivitiesDashboard = ({ recentActivities, loading, xnatHost }) => {
    const data = [
        { name: 'Project', values: recentActivities.map((e) => e.project) },
        { name: 'Type', values: recentActivities.map((e) => e.typeDesc) },
        {
            name: 'Label',
            values: recentActivities.map((e) => toChip(e.label, e.id, xnatHost)),
        },
        { name: 'Element', values: recentActivities.map((e) => e.elementName) },
    ];

    return (
        <RexaCard title="Recent Activities" className={classes.tableCard}>
            <RexaDataTable
                data={data}
                loading={loading}
                noDataLabel="No recent activities"
            />
        </RexaCard>
    );
};

RecentActivitiesDashboard.propTypes = {
    recentActivities: PropTypes.array,
    loading: PropTypes.bool,
    xnatHost: PropTypes.string,
};

export default RecentActivitiesDashboard;
