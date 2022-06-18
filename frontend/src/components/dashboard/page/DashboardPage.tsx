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
import { Project } from '../../../models/project/Project';

const DashboardPage = () => {
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
};

export default DashboardPage;
