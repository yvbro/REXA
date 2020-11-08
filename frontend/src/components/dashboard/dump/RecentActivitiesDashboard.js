import React from 'react';

import { Chip } from '@material-ui/core';

import RexaDataTable from '../../common/RexaDataTable';
import { getXnatUri } from '../../../helpers/xnat';

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

const RecentActivitiesDashboard = ({
    recentActivities,
    loadingRecentActivities,
    xnatHost,
}) => {
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
        <RexaDataTable
            title="Recent Activities"
            data={data}
            loading={loadingRecentActivities}
            noDataLabel="No recent activities data"
        />
    );
};

export default RecentActivitiesDashboard;
