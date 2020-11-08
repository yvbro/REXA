import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {Chip} from "@material-ui/core";

import {fetchRecentActivities} from '../redux/dashboardDuck';
import RexaDataTable from "../../common/RexaDataTable";

import {getXnatUri} from "../../../helpers/xnat";

const toChip = (label, id, xnatHost) => {
    return (<Chip
        label={label}
        clickable
        color="primary"
        component="a"
        href={getXnatUri(xnatHost, id)}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
    />);
}

const RecentActivitiesDashboard = () => {
    const dispatch = useDispatch();

    const {recentActivities, loadingRecentActivities, xnatHost} = useSelector(
        (state) => ({
            recentActivities: state.dashboard.recentActivities.data,
            loadingRecentActivities: state.dashboard.recentActivities.loading,
            xnatHost: state.settings.xnatHost,
        })
    );

    useEffect(() => {
        dispatch(fetchRecentActivities());
    }, [dispatch]);

    const data = [
        {name: 'Project', values: recentActivities.map(e => e.project)},
        {name: 'Type', values: recentActivities.map(e => e.typeDesc)},
        {name: 'Label', values: recentActivities.map(e => toChip(e.label, e.id, xnatHost))},
        {name: 'Element', values: recentActivities.map(e => e.elementName)},
    ];

    return (
        <RexaDataTable title='Recent Activities'
                       data={data}
                       loading={loadingRecentActivities}
                       noDataLabel='No recent activities data' />
    );
}

export default RecentActivitiesDashboard;
