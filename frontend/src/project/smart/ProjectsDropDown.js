import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import {
  InputLabel,
  NativeSelect,
  FormHelperText,
  FormControl,
  makeStyles,
} from "@material-ui/core"

import { fetchProject, fetchProjects } from "../redux/projectDuck"

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export const ProjectsDropDown = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { projects, loading, project } = useSelector((state) => ({
    projects: state.project.projectsList.data,
    loading: state.project.projectsList.loading,
    project: state.project.selectedProject.data,
  }))

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const onChange = (event) => dispatch(fetchProject(event.target.value))

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-native-helper">Project Id</InputLabel>
      <NativeSelect
        value={project ? project.projectId : ""}
        onChange={onChange}
        inputProps={{
          name: "project",
          id: "age-native-helper",
        }}
      >
        <option value="" />
        {!loading &&
          projects &&
          projects.map((p) => (
            <option key={p.name} value={p.id}>
              {p.name}
            </option>
          ))}
      </NativeSelect>
      <FormHelperText>Select your XNAT project to analyse</FormHelperText>
    </FormControl>
  )
}
