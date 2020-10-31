import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {fetchPreAchives} from '../redux/dashboardDuck';
import RexaDataTable from "../../common/RexaDataTable";

export const PrearchiveDashboard = () => {
    const dispatch = useDispatch();

    const {preAchives, loadingPreArchives} = useSelector((state) => ({
        preAchives: state.dashboard.preAchives.data,
        loadingPreArchives: state.dashboard.preAchives.loading,
    }));

    useEffect(() => {
        dispatch(fetchPreAchives());
    }, [dispatch]);

    const data = [
        {name: 'Project', values: preAchives.map(e => e.project)},
        {name: 'Subject', values: preAchives.map(e => e.subject)},
        {name: 'Session', values: preAchives.map(e => e.session)},
        {name: 'Scan Date', values: preAchives.map(e => e.scanDate)},
        {name: 'Upload Date', values: preAchives.map(e => e.updloadDate)},
        {name: 'Status', values: preAchives.map(e => e.status)},
    ];

    return (
        <RexaDataTable title='Prearchive'
                       data={data}
                       loading={loadingPreArchives}
                       noDataLabel='No data in the PreArchive!' />
    );
};

export default PrearchiveDashboard;
