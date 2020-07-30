import React from 'react';

import { useSelector } from 'react-redux';
import { Grid, Typography, makeStyles } from '@material-ui/core';

import { ProjectInfo } from './ProjectInfo';
import { NoProjectData } from './NoProjectData';
import {ProcessorGrid} from "./ProcessorGrid";
import {ScanGrid} from "./ScanGrid";

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
                <Grid item md={6}>
                    <Typography
                        className={classes.loading}
                        variant="subtitle1"
                        gutterBottom
                    >
                        Loading...
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    return (
        <>
            {project && project.assessors ? (
                <>
                    <Grid container spacing={3}>
                        <Grid item md={3} xs={12}>
                            <ProjectInfo project={project}/>
                        </Grid>
                        <ScanGrid scans={project.scans} />
                    </Grid>
                    <ProcessorGrid processors={project.assessors}/>
                </>
            ) : (
                <>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <NoProjectData />
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};
