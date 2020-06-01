import React from "react";
import PropTypes from "prop-types";
import {Table} from "react-bootstrap";

export const ProjectTable = ({project}) => {
    console.log(project);
    return (
        <>
            <h3>Project Information</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Subjects</th>
                    <th>Sessions</th>
                    <th>Scans</th>
                    <th>Processes</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{project.numberOfSubject}</td>
                    <td>{project.numberOfSession}</td>
                    <td>{project.numberOfScan}</td>
                    <td>{project.assessors.length}</td>
                </tr>
                </tbody>
            </Table>
        </>
    )
};

ProjectTable.propTypes = {
    project: PropTypes.object.isRequired,
};
