import React, { useEffect } from 'react';
import PropTypes from "prop-types";

import { useDispatch, useSelector } from 'react-redux';

import {
    InputLabel,
    Select,
    FormControl,
    MenuItem,
} from '@material-ui/core';

import { fetchProject, fetchProjects } from '../redux/projectDuck';
import classes from '../dumb/project.module.scss';

export const ProjectsDropDown = ({ projectSelected }) => {
    const dispatch = useDispatch();

    const { projects, loading, project } = useSelector((state) => ({
        projects: state.project.projectsList.data,
        loading: state.project.projectsList.loading,
        project: state.project.selectedProject.data,
    }));

    useEffect(() => {
        projectSelected
            ? dispatch(fetchProject(projectSelected))
            : dispatch(fetchProjects());
    }, [dispatch, projectSelected]);

    const onChange = (event) => dispatch(fetchProject(event.target.value));

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="project-selector">Project</InputLabel>
            <Select
                labelId="project-selector"
                value={project && project.projectId ? project.projectId : ''}
                onChange={onChange}
                label="project"
                disabled={loading}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {!loading &&
                    projects &&
                    projects.map((p) => (
                        <MenuItem key={p.name} value={p.id}>
                            {p.name}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
};

ProjectsDropDown.propTypes = {
    projectSelected: PropTypes.string
};
