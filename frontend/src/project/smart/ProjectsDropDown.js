import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Dropdown, DropdownButton, Form} from "react-bootstrap";

import {fetchProject, fetchProjects} from "../redux/projectDuck";

export const ProjectsDropDown = () => {
    const dispatch = useDispatch();
    const {projects, loading} = useSelector(
        state => ({
            projects: state.project.projectsList.data,
            loading: state.project.projectsList.loading,
        })
    );

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Form>
            <DropdownButton id="dropdown-basic-button" title="Select your XNAT project to analyse"
                            onSelect={(projectId) => dispatch(fetchProject(projectId))}>
                {projects && projects.map(project =>
                    <Dropdown.Item eventKey={project.id} key={project.name}>{project.name}</Dropdown.Item>)
                }
            </DropdownButton>
        </Form>
    )
};
