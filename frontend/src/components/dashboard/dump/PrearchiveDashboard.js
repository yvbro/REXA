import React from 'react';
import PropTypes from 'prop-types';

import RexaDataTable from '../../common/RexaDataTable';
import RexaCard from '../../common/RexaCard';

import classes from './dashboard.module.scss';

export const PrearchiveDashboard = ({ preArchives, loading }) => {
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
                noDataLabel="No data in the PreArchive!"
            />
        </RexaCard>
    );
};

PrearchiveDashboard.propTypes = {
    preArchives: PropTypes.array,
    loading: PropTypes.bool,
};

export default PrearchiveDashboard;
