import React, { useState } from 'react';

import { Chip } from '@material-ui/core';
import { toast } from 'react-toastify';

import RexaCard from '../../common/RexaCard';
import RexaDataTable from '../../common/RexaDataTable';
import { getXnatUri } from '../../../helpers/xnat';
import { RecentActivity } from '../../../models/project/RecentActivity';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { RexaError } from '../../../models/management/RexaError';
import LoadingIndicator from '../../common/LoadingIndicator';

interface RecentActivitiesDashboardProps {
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

const RecentActivitiesDashboard = ({ xnatHost }: RecentActivitiesDashboardProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const { isLoading, data: recentActivities } = useQuery(
        ['fetchRecentActivities', rowsPerPage, page],
        () => axios.get<RecentActivity[]>('/private/recentActivities'),
        {
            onError: (error: AxiosError<RexaError>) => {
                toast.error(error?.response?.data?.message);
            },
        }
    );

    if (isLoading) {
        return <LoadingIndicator />;
    }

    const data = [
        { name: 'Project', values: recentActivities?.data.map((e) => e.project) },
        { name: 'Type', values: recentActivities?.data.map((e) => e.typeDesc) },
        {
            name: 'Label',
            values: recentActivities?.data.map((e) =>
                toChip(e.label, e.id, xnatHost)
            ),
        },
        {
            name: 'Element',
            values: recentActivities?.data.map((e) => e.elementName),
        },
    ];

    return (
        <RexaCard title="Recent Activities">
            <RexaDataTable
                key="rexa_data_table_dashboard_pre_archive"
                data={data}
                loading={isLoading}
                noDataLabel="No recent activities"
                currentPage={page}
                rowsPerPage={rowsPerPage}
                totalElements={recentActivities?.data.length ?? 0}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </RexaCard>
    );
};

export default RecentActivitiesDashboard;
