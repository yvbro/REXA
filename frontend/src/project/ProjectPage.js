import React from "react";

import {Form} from "react-bootstrap";

import {ProjectDetails} from "./ProjectDetails";
import {ProjectsDropDown} from "./ProjectsDropDown";

class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {projectId: ""};
    }

    setProjectId = projectId => {
        this.setState({projectId: projectId});
    };

    render() {
        const {projectId} = this.state;

        return (
            <div>
                <h3>Project Dashboard</h3>
                <Form>
                    <ProjectsDropDown setProjectId={this.setProjectId}/>
                </Form>
                {projectId && <ProjectDetails projectId={projectId}/>}
            </div>
        )
    }
}

export default ProjectPage;
