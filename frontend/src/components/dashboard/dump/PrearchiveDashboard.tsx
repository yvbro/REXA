import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RexaDataTable from '../../common/RexaDataTable';
import RexaCard from '../../common/RexaCard';
import classes from './dashboard.module.scss';
import { PreArchive } from '../../../models/project/PreArchive';

interface PrearchiveDashboardProps {
    preArchives: PreArchive[];
    loading: boolean;
}

export const PrearchiveDashboard = ({
    preArchives,
    loading,
}: PrearchiveDashboardProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const data = [
        { name: 'Project', values: preArchives.map((e) => e.project) },
        { name: 'Subject', values: preArchives.map((e) => e.subject) },
        { name: 'Session', values: preArchives.map((e) => e.session) },
        { name: 'Scan Date', values: preArchives.map((e) => e.scanDate) },
        { name: 'Upload Date', values: preArchives.map((e) => e.updloadDate) },
        { name: 'Status', values: preArchives.map((e) => e.status) },
    ];

    return (
        <RexaCard title="Prearchive" className={classes.tableCard}>
            <RexaDataTable
                data={data}
                loading={loading}
                noDataLabel="No data in the PreArchive"
                currentPage={page}
                rowsPerPage={rowsPerPage}
                totalElements={preArchives.length}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </RexaCard>
    );
};

export default PrearchiveDashboard;
