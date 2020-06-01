import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Col, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";

import {fetchProject, fetchProjects} from "../redux/projectDuck";

import style from '../dumb/project.module.scss';

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

    const onChange = (event) => dispatch(fetchProject(event.target.value));

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Form className={style.paddingTop} onChange={onChange}>
            <Form.Group as={Row} controlId="dropdownProjects">
                <Form.Label column sm="4">
                    Select your XNAT project to analyse:
                </Form.Label>
                <Col sm="6">
                    <Form.Control as="select">
                        <option>No project</option>
                        {projects && projects.map(project =>
                            <option key={project.name} value={project.id}>{project.name}</option>)
                        }
                    </Form.Control>
                </Col>
            </Form.Group>
        </Form>
    )
};
