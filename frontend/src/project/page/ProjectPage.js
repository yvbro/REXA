import React from 'react';

import { ProjectsDropDown } from '../smart/ProjectsDropDown';
import AppLayout from '../../app/AppLayout';
import { ProjectDetails } from '../dumb/ProjectDetails';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
}));

export const ProjectPage = () => {
    const classes = useStyles();

    return (
        <AppLayout>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item md={3} xs={12}>
                        <ProjectsDropDown />
                    </Grid>
                </Grid>
                <ProjectDetails />
            </div>
        </AppLayout>
    );
};

export default ProjectPage;
