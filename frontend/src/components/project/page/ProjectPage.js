import React from 'react';

import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import ProjectsDropDown from '../smart/ProjectsDropDown';
import ProjectDetails from '../dumb/ProjectDetails';
import classes from '../../common/common.module.scss'; 

export const ProjectPage = () => {
    const location = useLocation();

    return (
        <div className={classes.rootDiv}>
            <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                    <ProjectsDropDown projectSelected={location.project} />
                </Grid>
            </Grid>
            <ProjectDetails />
        </div>
    );
};

export default ProjectPage;
