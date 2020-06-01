import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Form} from "react-bootstrap";

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
        <Form className={style.projectsForm} onChange={onChange}>
            <div className="form-inline">
                <label>
                    Select your XNAT project to analyse:
                </label>
                <Form.Control as="select" className={style.marginLeft}>
                    <option>No project</option>
                    {projects && projects.map(project =>
                        <option key={project.name} value={project.id}>{project.name}</option>)
                    }
                </Form.Control>
            </div>
        </Form>
    )
};
