import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RexaDataTable from '../../common/RexaDataTable';
import RexaCard from '../../common/RexaCard';

export const PrearchiveDashboard = ({ preArchives, loading }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const data = [
        { name: 'Project', values: preArchives.map((e) => e.project) },
        { name: 'Subject', values: preArchives.map((e) => e.subject) },
        { name: 'Session', values: preArchives.map((e) => e.session) },
        { name: 'Scan Date', values: preArchives.map((e) => e.scanDate) },
        { name: 'Upload Date', values: preArchives.map((e) => e.updloadDate) },
        { name: 'Status', values: preArchives.map((e) => e.status) },
    ];

    return (
        <RexaCard title="Prearchive" >
            <RexaDataTable
                data={data}
                loading={loading}
                noDataLabel="No data in the PreArchive"
                currentPage={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                totalElements={preArchives.length}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </RexaCard>
    );
};

PrearchiveDashboard.propTypes = {
    preArchives: PropTypes.array,
    loading: PropTypes.bool,
};

export default PrearchiveDashboard;
