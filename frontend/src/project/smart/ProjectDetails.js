import React from "react";

import {useSelector} from "react-redux";

import {ProcessorDetails} from "../dumb/ProcessorDetails";
import {ProjectTable} from "../dumb/ProjectTable";
import {NoProjectData} from "../dumb/NoProjectData";

import style from '../dumb/project.module.scss';

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
                <>
                    <ProjectTable project={project}/>
                    <ProcessorDetails processors={project.assessors}/>
                </>
                : <NoProjectData/>
            }
        </div>
    )
};
