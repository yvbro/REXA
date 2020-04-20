import axios from "axios";
import {toast} from "react-toastify";

const initialState = {projects: [], assessments: [], scans: []};
const PROJECTS_FETCHED = "PROJECTS_FETCHED";
const PROJECT_FETCHED = "PROJECT_FETCHED";

export default function xnat(state = initialState, action) {
    switch (action.type) {
        case PROJECTS_FETCHED:
            return {...state, projects: action.payload};
        case PROJECT_FETCHED:
            return {
                ...state,
                assessments: action.payload.assessments,
                scans: action.payload.scans,
            };
        default:
            return state
    }
}

export function fetchProjects() {
    console.log('fetching PROJECTs');
    return (dispatch) =>
        axios
            .get("/projects")
            .then((response) =>
                dispatch({type: PROJECTS_FETCHED, payload: response.data})
            )
            .catch(() => {
                toast.error("Failed to get data from xnat")
            })
}

export function fetchProject(projectId) {
    return (dispatch) =>
        axios
            .get(`/projects/${projectId}`)
            .then((response) =>
                dispatch({type: PROJECT_FETCHED, payload: response.data})
            )
            .catch(() => {
                toast.error("Failed to get data from xnat")
            })
}
