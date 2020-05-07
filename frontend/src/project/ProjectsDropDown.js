import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import axios from "axios";
import {Dropdown, DropdownButton} from "react-bootstrap";

export const ProjectsDropDown = ({setProjectId}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("/projects");
            setProjects(result.data);
        };

        fetchData();
    }, []);

    if (!projects) {
        return (<span>Loading</span>);
    }

    return (
        <DropdownButton id="dropdown-basic-button" title="Select your XNAT project to analyse" onSelect={setProjectId}>
            {projects.map(project => <Dropdown.Item eventKey={project.id}
                                                    key={project.name}>{project.name}</Dropdown.Item>)}
        </DropdownButton>
    )
};

ProjectsDropDown.propTypes = {
    setProjectId: PropTypes.func.isRequired,
};
