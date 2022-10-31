import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { toast } from 'react-toastify';

import { PreArchive } from '../../../models/project/PreArchive';
import { RexaError } from '../../../models/management/RexaError';

import RexaCard from '../../common/RexaCard';
import RexaDataTable from '../../common/RexaDataTable';
import LoadingIndicator from '../../common/LoadingIndicator';

import classes from './dashboard.module.scss';

export const PrearchiveDashboard = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const { isLoading, data: preArchives } = useQuery(
        ['fetchPreArchives', page, rowsPerPage],
        () => axios.get<PreArchive[]>('/private/preArchives'),

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
        { name: 'Project', values: preArchives?.data.map((e) => e.project)!! },
        { name: 'Subject', values: preArchives?.data.map((e) => e.subject)!! },
        { name: 'Session', values: preArchives?.data.map((e) => e.session)!! },
        { name: 'Scan Date', values: preArchives?.data.map((e) => e.scanDate)!! },
        {
            name: 'Upload Date',
            values: preArchives?.data.map((e) => e.updloadDate)!!,
        },
        { name: 'Status', values: preArchives?.data.map((e) => e.status)!! },
    ];

    return (
        <RexaCard title="Prearchive" className={classes.tableCard}>
            <RexaDataTable
                key="rexa_data_table_dashboard_pre_archive"
                data={data}
                loading={isLoading}
                noDataLabel="No data in the PreArchive"
                currentPage={page}
                rowsPerPage={rowsPerPage}
                totalElements={preArchives?.data.length ?? 0}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </RexaCard>
    );
};

export default PrearchiveDashboard;
