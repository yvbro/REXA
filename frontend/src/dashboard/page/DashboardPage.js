import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../../common/LoadingIndicator';
import { fetchRecentActivities } from '../redux/dashboardDuck';

import RecentActivities from '../dump/RecentActivities';
import AppLayout from '../../app/AppLayout';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Prearchive from '../dump/Prearchive';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const DashboardPage = () => {
    const classes = useStyles();

    return(
        <AppLayout>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <RecentActivities />
                </Grid>
                <Grid item xs={6}>
                    <Prearchive />
                </Grid>
                <Grid item xs={12}>
                    <Paper>PROJECTS</Paper>
                </Grid>
            </Grid>
        </div>
    </AppLayout>
    )
}

export default DashboardPage;
