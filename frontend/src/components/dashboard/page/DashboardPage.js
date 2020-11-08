import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {Grid} from '@material-ui/core';

import PrearchiveDashboard from '../dump/PrearchiveDashboard';
import RecentActivitiesDashboard from '../dump/RecentActivitiesDashboard';
import ProjectDashboard from '../dump/ProjectDashboard';
import {fetchSettings} from '../../settings/redux/settingsDuck';
import classes from '../../common/common.module.scss';

const DashboardPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    return (
        <div className={classes.rootDiv}>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <RecentActivitiesDashboard/>
                </Grid>
                <Grid item xs={7}>
                    <PrearchiveDashboard/>
                </Grid>
                <Grid item xs={2}>
                    <ProjectDashboard/>
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardPage;
