/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../../models/project/Project';

interface ProjectState {
    projectsList: Project[];
    selectedProject: Project | null;
}

const initialState: ProjectState = {
    projectsList: [],
    selectedProject: null,
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projectsList = action.payload;
        },
        setSelectedProject: (state, action: PayloadAction<Project>) => {
            state.selectedProject = action.payload;
        },
        resetProjects: (state) => {
            state = initialState;
        },
    },
});

export const { setProjects, setSelectedProject, resetProjects } =
    projectSlice.actions;

export default projectSlice;
