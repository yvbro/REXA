import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  InputLabel,
  Select,
  FormControl,
  makeStyles,
  MenuItem,
} from "@material-ui/core";

import { fetchProject, fetchProjects } from "../redux/projectDuck";

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: "white",
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const ProjectsDropDown = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { projects, loading, project } = useSelector((state) => ({
    projects: state.project.projectsList.data,
    loading: state.project.projectsList.loading,
    project: state.project.selectedProject.data,
  }));

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch]);

  const onChange = (event) => dispatch(fetchProject(event.target.value));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="project-selector">Select a project</InputLabel>
      <Select
        labelId="project-selector"
        id="demo-simple-select-outlined"
        value={project ? project.projectId : ""}
        onChange={onChange}
        label="project"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {!loading &&
          projects &&
          projects.map((p) => (
            <MenuItem key={p.name} value={p.id}>
              {p.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
