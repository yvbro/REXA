import React from 'react';

import RexaDataTable from '../../common/RexaDataTable';

export const PrearchiveDashboard = ({ preArchives, loadingPreArchives }) => {
    const data = [
        { name: 'Project', values: preArchives.map((e) => e.project) },
        { name: 'Subject', values: preArchives.map((e) => e.subject) },
        { name: 'Session', values: preArchives.map((e) => e.session) },
        { name: 'Scan Date', values: preArchives.map((e) => e.scanDate) },
        { name: 'Upload Date', values: preArchives.map((e) => e.updloadDate) },
        { name: 'Status', values: preArchives.map((e) => e.status) },
    ];

    return (
        <RexaDataTable
            title="Prearchive"
            data={data}
            loading={loadingPreArchives}
            noDataLabel="No data in the PreArchive!"
        />
    );
};

export default PrearchiveDashboard;
