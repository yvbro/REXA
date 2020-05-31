import React from "react";
import PropTypes from 'prop-types';

import {useSelector} from "react-redux";

import {ProcessorDetails} from "../dumb/ProcessorDetails";
import {ProjectTable} from "../dumb/ProjectTable";

export const ProjectDetails = () => {
    const {project, loading} = useSelector(
        state => ({
            project: state.project.selectedProject.data,
            loading: state.project.selectedProject.loading
        })
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (project === undefined) {
        return <div>No project selected</div>
    }

    return (
        <>
            <ProjectTable project={project}/>
            <ProcessorDetails processors={project.assessors}/>
        </>
    )
};

ProjectDetails.propTypes = {
    projectId: PropTypes.string.isRequired,
};
