import React, { useEffect, useState } from "react"

import { DropdownButton, Dropdown } from "react-bootstrap"
import { fetchProjects } from "../xnat/xnatDuck"

export default function ProjectsDropDown() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProjects().then((data) => setProjects(data))
  })

  return (
    <DropdownButton title="Your Xnat Projects" id="bg-nested-dropdown">
      {projects.map((project) => (
        <Dropdown.Item eventKey="1" key={project.name}>
          {project.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}
