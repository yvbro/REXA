import React, { useEffect }  from 'react';
import { useDispatch } from 'react-redux';

import AppLayout from '../../app/AppLayout';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import PrearchiveDashboard from '../dump/PrearchiveDashboard';
import RecentActivitiesDashboard from '../dump/RecentActivitiesDashboard';
import ProjectDashboard from '../dump/ProjectDashboard';
import { fetchSettings } from '../../settings/redux/settingsDuck';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const DashboardPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    return(
        <AppLayout>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <RecentActivitiesDashboard />
                </Grid>
                <Grid item xs={8}>
                    <PrearchiveDashboard />
                </Grid>
                <Grid item xs={2}>
                    <ProjectDashboard />
                </Grid>
            </Grid>
        </div>
    </AppLayout>
    )
}

export default DashboardPage;