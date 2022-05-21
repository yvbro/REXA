import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
    projectsList: Project[];
    selectedProject: Project | undefined;
};


const initialState: ProjectState = {
    projectsList: [],
    selectedProject: undefined,
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
        }         
    },
});

export const { setProjects, setSelectedProject, resetProjects } = projectSlice.actions;

export default projectSlice;