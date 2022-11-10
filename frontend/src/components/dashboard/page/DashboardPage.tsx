import React from 'react';
import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import { RootState } from '../../../store/store';

import ProjectDashboard from '../dump/ProjectDashboard';
import PrearchiveDashboard from '../dump/PrearchiveDashboard';
import RecentActivitiesDashboard from '../dump/RecentActivitiesDashboard';

import classes from '../../common/common.module.scss';

function DashboardPage() {
    const { xnatHost } = useSelector((state: RootState) => ({
        xnatHost: state.auth.user.xnatHost,
    }));

    return (
        <div className={classes.rootDiv}>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <RecentActivitiesDashboard xnatHost={xnatHost ?? ''} />
                </Grid>
                <Grid item xs={3}>
                    <ProjectDashboard />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <PrearchiveDashboard />
                </Grid>
            </Grid>
        </div>
    );
}

export default DashboardPage;
