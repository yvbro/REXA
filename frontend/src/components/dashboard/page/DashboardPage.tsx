import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';

import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';

import { RootState } from '../../../store/store';
import { RexaError } from '../../../models/management/RexaError';

import ProjectDashboard from '../dump/ProjectDashboard';
import LoadingIndicator from '../../common/LoadingIndicator';
import PrearchiveDashboard from '../dump/PrearchiveDashboard';
import RecentActivitiesDashboard from '../dump/RecentActivitiesDashboard';

import classes from '../../common/common.module.scss';
import { RecentActivity } from '../../../models/project/RecentActivity';
import { PreArchive } from '../../../models/project/PreArchive';

const DashboardPage = () => {
    const { xnatHost } = useSelector((state: RootState) => ({
        xnatHost: state.auth.user.xnatHost,
    }));

    const { isLoading: loadingProjects, data: projects } = useQuery(
        ['featProject'],
        () => axios.get<Project[]>('/private/projects'),
        {
            onError: (error: AxiosError<RexaError>) => {
                toast.error(error?.response?.data?.message);
            },
            keepPreviousData: true,
        }
    );

    const { isLoading: loadingPreArchives, data: preArchives } = useQuery(
        ['featProject'],
        () => axios.get<PreArchive[]>('/private/preArchives'),
        {
            keepPreviousData: true,
        }
    );

    const { isLoading: loadingRecentActivities, data: recentActivities } = useQuery(
        ['featProject'],
        () => axios.get<RecentActivity[]>('/private/recentActivities'),
        {
            keepPreviousData: true,
        }
    );

    if (loadingProjects) {
        return <LoadingIndicator />;
    }

    return (
        <div className={classes.rootDiv}>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <RecentActivitiesDashboard
                        recentActivities={recentActivities?.data}
                        loading={loadingRecentActivities}
                        xnatHost={xnatHost}
                    />
                </Grid>
                <Grid item xs={3}>
                    <ProjectDashboard
                        projects={projects?.data}
                        loading={loadingProjects}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <PrearchiveDashboard
                        preArchives={preArchives?.data}
                        loading={loadingPreArchives}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardPage;
