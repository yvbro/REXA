import React from "react";

import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import { ProcessorDetails } from "./ProcessorDetails";
import { ProjectInfo } from "./ProjectInfo";
import { NoProjectData } from "./NoProjectData";

import style from "./project.module.scss";

export const ProjectDetails = () => {

  const { project, loading, parentLoading } = useSelector((state) => ({
    project: state.project.selectedProject.data,
    loading: state.project.selectedProject.loading,
    parentLoading: state.project.projectsList.loading,
  }));

  if (loading || parentLoading) {
    return <div className={style.containerProject}>Loading...</div>;
  }

  return (
    <>
      {project && project.assessors ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ProjectInfo project={project} />
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProcessorDetails processors={project.assessors} />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={6}>
              <NoProjectData />
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </>
      )}
    </>
  );
};
