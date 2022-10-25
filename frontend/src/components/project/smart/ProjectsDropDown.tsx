import React from 'react';

import { InputLabel, FormControl, MenuItem } from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import classes from '../dumb/project.module.scss';
import { Project } from '../../../models/project/Project';

interface ProjectDropDownProps {
    projects: Project[];
    projectSelected: string;
    onProjectSelected: (project: string) => void;
}

const ProjectsDropDown = ({
    projects,
    projectSelected,
    onProjectSelected,
}: ProjectDropDownProps) => {
    const onChange = (event: SelectChangeEvent) =>
        onProjectSelected(event.target.value);

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="project-selector" shrink={false}>
                {projectSelected ? projectSelected : 'Select a project'}
            </InputLabel>
            <Select
                labelId="project-selector"
                value={projectSelected}
                onChange={onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {projects.map((p) => (
                    <MenuItem key={p.id} value={p.name}>
                        {p.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ProjectsDropDown;
