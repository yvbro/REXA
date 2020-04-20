import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {ProjectsDropDown} from "./ProjectsDropDown";
// import BarChart from "../chart/BarChart";
import { fetchProject } from "../xnat/xnatDuck";
import {Form} from "react-bootstrap";

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { project: "" };
  }

  setProjectToFetch = project => {
    this.setState({ project: project });
  }

  render() {
    return (
      <div>
        <h3>Project Dashboard</h3>
        <Form>
          <ProjectsDropDown setProjectToFetch={this.setProjectToFetch} />
        </Form>
        {/*( assessments &&*/}
        {/*  <BarChart data={assessments} title="Processes Report" color="#70CAD1" />*/}
        {/*)*/}
      </div>
    )
  }
}

ProjectPage.propTypes = {
  fetchProject: PropTypes.func.isRequired,

  assessments: PropTypes.array,
  scans: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    assessments: state.assessments,
    scans: state.scans,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchProject,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)
