import React from 'react';

import { useSelector } from 'react-redux';
import { Grid, Typography, makeStyles } from '@material-ui/core';

import { ProcessorDetails } from './ProcessorDetails';
import { ProjectInfo } from './ProjectInfo';
import { NoProjectData } from './NoProjectData';

const useStyles = makeStyles({
    loading: {
        textAlign: 'center',
    },
});

export const ProjectDetails = () => {
    const classes = useStyles();

    const { project, loading, parentLoading } = useSelector((state) => ({
        project: state.project.selectedProject.data,
        loading: state.project.selectedProject.loading,
        parentLoading: state.project.projectsList.loading,
    }));

    if (loading || parentLoading) {
        return (
            <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={6}>
                    <Typography
                        className={classes.loading}
                        variant="subtitle1"
                        gutterBottom
                    >
                        Loading...
                    </Typography>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        );
    }

    return (
        <>
            {project && project.assessors ? (
                <>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <ProjectInfo project={project} />
                        </Grid>
                        <Grid item xs={6}></Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ProcessorDetails processors={project.assessors} />
                        </Grid>
                    </Grid>
                </>
            ) : (
                <>
                    <Grid container spacing={3}>
                        <Grid item xs></Grid>
                        <Grid item xs={6}>
                            <NoProjectData />
                        </Grid>
                        <Grid item xs></Grid>
                    </Grid>
                </>
            )}
        </>
    );
};
