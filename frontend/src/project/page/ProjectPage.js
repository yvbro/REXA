import React from "react";

import { ProjectsDropDown } from "../smart/ProjectsDropDown";
import AppLayout from "../../app/AppLayout";
import HeaderPage from "../../common/HeaderPage";
import { ProjectDetails } from "../dumb/ProjectDetails";

export const ProjectPage = () => {
  return (
    <AppLayout>
      <HeaderPage title={"Project Dashboard"} />
      <ProjectsDropDown />
      <ProjectDetails />
    </AppLayout>
  )
};

export default ProjectPage;
