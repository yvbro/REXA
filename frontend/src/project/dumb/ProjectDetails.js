import React from "react";

import {useSelector} from "react-redux";

import {ProcessorDetails} from "./ProcessorDetails";
import {ProjectTable} from "./ProjectTable";
import {NoProjectData} from "./NoProjectData";

import style from './project.module.scss';

export const ProjectDetails = () => {
    const {project, loading} = useSelector(
        state => ({
            project: state.project.selectedProject.data,
            loading: state.project.selectedProject.loading
        })
    );

    if (loading) {
        return <div className={style.containerProject}>Loading...</div>;
    }

    return (
        <div className={style.containerProject}>
            {project ?
                <div className={style.project}>
                    <ProjectTable project={project}/>
                    <ProcessorDetails processors={project.assessors}/>
                </div>
                : <NoProjectData/>
            }
        </div>
    )
};
