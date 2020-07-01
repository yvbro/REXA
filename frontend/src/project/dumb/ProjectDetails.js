import React from "react";

import { useSelector } from "react-redux";
import { Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ProcessorDetails } from "./ProcessorDetails";
import { ProjectInfo } from "./ProjectInfo";
import { NoProjectData } from "./NoProjectData";

import style from "./project.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  }
}));

export const ProjectDetails = () => {
  const classes = useStyles();

  const { project, loading } = useSelector((state) => ({
    project: state.project.selectedProject.data,
    loading: state.project.selectedProject.loading,
  }));

  if (loading) {
    return <div className={style.containerProject}>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      {project && project.assessors ? (
        <>
          <div className={classes.section1}>
            <Grid container alignItems="center">
              <Grid item xs>
                <ProjectInfo project={project} />
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section2}>
            <Grid container alignItems="center">
              <Grid item xs>
                <ProcessorDetails processors={project.assessors} />
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <NoProjectData />
      )}
    </div>
  )
};
