import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Chip } from '@material-ui/core';

import RexaCard from '../../common/RexaCard';
import RexaDataTable from '../../common/RexaDataTable';
import { getXnatUri } from '../../../helpers/xnat';
import { RecentActivity } from '../../../models/project/RecentActivity';

interface RecentActivitiesDashboardProps {
    recentActivities: RecentActivity[];
    loading: boolean;
    xnatHost: string;
}

const toChip = (label: string, id: number, xnatHost: string) => {
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
    loading,
    xnatHost,
}: RecentActivitiesDashboardProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

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
        <RexaCard title="Recent Activities">
            <RexaDataTable
                data={data}
                loading={loading}
                noDataLabel="No recent activities"
                currentPage={page}
                rowsPerPage={rowsPerPage}
                totalElements={recentActivities.length}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </RexaCard>
    );
};

export default RecentActivitiesDashboard;
