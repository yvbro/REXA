import { useState } from 'react';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import ProjectsDropDown from '../smart/ProjectsDropDown';
import ProjectDetails from '../dumb/ProjectDetails';
import classes from '../../common/common.module.scss';
import { Project } from '../../../models/project/Project';
import { RexaError } from '../../../models/management/RexaError';

export const ProjectPage = () => {
    const location = useLocation<{ project: string }>();
    const [projectSelected, setProjectSelected] = useState(
        location.state ? location.state.project : ''
    );

    const { data: project } = useQuery(
        ['fetchProject', projectSelected],
        () => axios.get(`/private/projects/${projectSelected}`),
        {
            keepPreviousData: true,
        }
    );

    const { data: projects } = useQuery(
        ['fetchProjects'],
        () => axios.get<Project[]>('/private/projects'),
        {
            onSuccess: () => {},
            onError: (error: AxiosError<RexaError>) => {
                toast.error(error?.response?.data?.message);
            },
            keepPreviousData: true,
        }
    );

    return (
        <div className={classes.rootDiv}>
            <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                    <ProjectsDropDown
                        projects={projects?.data ?? []}
                        projectSelected={projectSelected}
                        onProjectSelected={setProjectSelected}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default ProjectPage;
