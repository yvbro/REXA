import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';
import _get from 'lodash/get';

import PrearchiveDashboard from '../dump/PrearchiveDashboard';
import RecentActivitiesDashboard from '../dump/RecentActivitiesDashboard';
import ProjectDashboard from '../dump/ProjectDashboard';
import { fetchRecentActivities, fetchPreAchives } from '../redux/dashboardDuck';
import { fetchProjects } from '../../project/redux/projectDuck';
import { toast } from 'react-toastify';
import LoadingIndicator from '../../common/LoadingIndicator';
import classes from '../../common/common.module.scss'; 


const DashboardPage = () => {
    const dispatch = useDispatch();

    const {
        recentActivities,
        loadingRecentActivities,
        preArchives,
        loadingPreArchives,
        projects,
        loadingProjects,
        xnatHost,
    } = useSelector((state) => ({
        recentActivities: state.dashboard.recentActivities.data,
        loadingRecentActivities: state.dashboard.recentActivities.loading,
        preArchives: state.dashboard.preArchives.data,
        loadingPreArchives: state.dashboard.preArchives.loading,
        projects: state.project.projectsList.data,
        loadingProjects: state.project.projectsList.loading,
        xnatHost: state.auth.user.xnatHost,
    }));

    useEffect(() => {
        dispatch(fetchProjects())
            .then(() => {
                dispatch(fetchPreAchives());
                dispatch(fetchRecentActivities());
            })
            .catch((error) => {
                toast.error(_get(error, 'response.data.message', null));
            });
    }, [dispatch]);

    if (loadingProjects) {
        return <LoadingIndicator />;
    }

    return (
        <div className={classes.rootDiv}>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <RecentActivitiesDashboard
                        recentActivities={recentActivities}
                        loading={loadingRecentActivities}
                        xnatHost={xnatHost}
                    />
                </Grid>
                <Grid item xs={7}>
                    <PrearchiveDashboard
                        preArchives={preArchives}
                        loading={loadingPreArchives}
                    />
                </Grid>
                <Grid item xs={2}>
                    <ProjectDashboard
                        projects={projects}
                        loading={loadingProjects}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardPage;
