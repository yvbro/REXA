import React from "react";
import PropTypes from "prop-types";

import { extractAssessorsProcTypeAndStatus } from "../../utils/xnat";
import StackedProjectColumnChart from "../../chart/StackedProjectColumnChart";

export const ProcessorDetails = ({ processors }) => {
  let processorsStats = [];
  if (processors) {
    processorsStats = extractAssessorsProcTypeAndStatus(processors)
  }

  return (
    <>
      <h3>Processor Board</h3>
      <StackedProjectColumnChart assessors={processorsStats} />
    </>
  )
};

ProcessorDetails.propTypes = {
  processors: PropTypes.array.isRequired,
};
