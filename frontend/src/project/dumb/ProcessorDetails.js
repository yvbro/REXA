import React from "react";
import PropTypes from 'prop-types';

import {extractAssessorsProcTypeAndStatus} from "../../utils/xnat";
import StackedProjectColumnChart from "../../chart/StackedProjectColumnChart";

export const ProcessorDetails = ({processors}) => {
    let processorsStats = [];
    if (processors) {
        processorsStats = extractAssessorsProcTypeAndStatus(processors);
    }

    return (
        <StackedProjectColumnChart assessors={processorsStats} />
    )
};

ProcessorDetails.propTypes = {
    processors: PropTypes.array.isRequired,
};
