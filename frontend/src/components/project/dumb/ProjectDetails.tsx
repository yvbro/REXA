import React from 'react';

import { Grid } from '@material-ui/core';

import ProjectInfo from './ProjectInfo';
import ProcessorGrid from './ProcessorGrid';
import ScanGrid from './ScanGrid';

import LoadingIndicator from '../../common/LoadingIndicator';
import NoData from '../../common/NoData';
import { Project } from '../../../models/project/Project';

interface ProjectDetailsProps {
    project: Project | undefined;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
    return (
        <>
            {/*             { project == undefined ? (
                <LoadingIndicator />
            ) : (
                <>
                    <Grid container spacing={3}>
                        <Grid item md={3} xs={12}>
                            <ProjectInfo project={project} />
                        </Grid>
                        <ScanGrid scans={project.scans} />
                    </Grid>
                    <ProcessorGrid processors={project.assessors} />
                </>
            ) : (
                <>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <NoData label="No project selected or no data found" />
                        </Grid>
                    </Grid>
                </>
            )} */}
        </>
    );
};

export default ProjectDetails;
