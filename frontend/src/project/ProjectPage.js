import React from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import ProjectsDropDown from "./ProjectsDropDown"
import BarChart from "../chart/BarChart"
import { fetchProject } from "../xnat/xnatDuck"

class ProjectPage extends React.Component {
  constructor(props) {
    super(props)
    this.setState({ project: "" })
  }

  setProject(project) {
    this.setState({ project: project })
  }

  render() {
    const { assessments } = this.props

    return (
      <div>
        <h3>Project Dashboard</h3>
        <ProjectsDropDown setProject={this.setProject} />
        ( assessments &&
        <BarChart data={assessments} title="Processes Report" color="#70CAD1" />)
      </div>
    )
  }
}

ProjectPage.propTypes = {
  fetchProject: PropTypes.func.isRequired,

  assessments: PropTypes.array,
  scans: PropTypes.array,
}

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
