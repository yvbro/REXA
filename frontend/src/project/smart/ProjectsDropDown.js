import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Form} from "react-bootstrap";

import {fetchProject, fetchProjects} from "../redux/projectDuck";

import style from '../dumb/project.module.scss';

export const ProjectsDropDown = () => {
    const dispatch = useDispatch();
    const {projects, loading, project} = useSelector(
        state => ({
            projects: state.project.projectsList.data,
            loading: state.project.projectsList.loading,
            project: state.project.selectedProject.data,
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
                <Form.Control as="select" className={style.marginLeft} defaultValue={project ? project.projectId : ""}>
                    <option value="">No project</option>
                    {!loading && projects && projects.map(p =>
                        <option key={p.name} value={p.id}>{p.name}</option>)
                    }
                </Form.Control>
            </div>
        </Form>
    )
};
