import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import { ProjectsDropDown } from '../smart/ProjectsDropDown';
import AppLayout from '../../app/AppLayout';
import { ProjectDetails } from '../dumb/ProjectDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
}));

export const ProjectPage = () => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <AppLayout>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item md={3} xs={12}>
                        <ProjectsDropDown projectSelected={location.project} />
                    </Grid>
                </Grid>
                <ProjectDetails />
            </div>
        </AppLayout>
    );
};

export default ProjectPage;
