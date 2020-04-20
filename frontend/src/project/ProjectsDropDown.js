import React, {useEffect, useState} from "react";

import axios from "axios";
import {DropdownButton, Dropdown} from "react-bootstrap";

export const ProjectsDropDown = ({setProjectToFetch}) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:9000/projects");
      setProjects(result.data);
    };

    fetchData();
  }, []);

  if (!projects) {
    return (<span>Loading</span>);
  }

  const onSelect = (project) => {
    setProjectToFetch(project);
  }

  return (
      <DropdownButton id="dropdown-basic-button" title="Select your XNAT project to analyse" onSelect={onSelect}>
        {projects.map( project => <Dropdown.Item eventKey={project.name} key={project.name}>{project.name}</Dropdown.Item>)}
      </DropdownButton>
  )
}
