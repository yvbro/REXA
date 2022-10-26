import React from 'react';

import { Grid } from '@material-ui/core';

import ProjectInfo from './ProjectInfo';
import ProcessorGrid from './ProcessorGrid';
import ScanGrid from './ScanGrid';

import NoData from '../../common/NoData';
import { ProjectXnatInfo } from '../../../models/project/ProjectXnatInfo';

interface ProjectDetailsProps {
    project: ProjectXnatInfo | undefined;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
    return (
        <>
            {project == undefined || project.projectId === 'None' ? (
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <NoData label="No project selected or no data found" />
                    </Grid>
                </Grid>
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
            )}
        </>
    );
};

export default ProjectDetails;
