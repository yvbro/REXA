import React from "react";

import { ProjectsDropDown } from "../smart/ProjectsDropDown";
import AppLayout from "../../app/AppLayout";
import { ProjectDetails } from "../dumb/ProjectDetails";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const ProjectPage = () => {
  const classes = useStyles();

  return (
    <AppLayout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <ProjectsDropDown />
          </Grid>
        </Grid>
        <ProjectDetails />
      </div>
    </AppLayout>
  );
};

export default ProjectPage;
