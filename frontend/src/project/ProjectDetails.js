import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import axios from "axios";

import {extractAssessorsProcTypeAndStatus} from "../xnat/xnat";
import StackedProjectColumnChart from "../chart/StackedProjectColumnChart";

export const ProjectDetails = ({projectId}) => {
    const [project, setProject] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:9000/projects/${projectId}`);
            setProject(result.data);
        };
        
        fetchData();
    }, [projectId]);

    let assessorsStats = [];
    if (project.assessors) {
        assessorsStats = extractAssessorsProcTypeAndStatus(project.assessors);
    }

    console.log(assessorsStats);

    return (
        <StackedProjectColumnChart assessors={assessorsStats} />
    )
};

ProjectDetails.propTypes = {
    projectId: PropTypes.string.isRequired,
};
