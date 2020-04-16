import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav"
import { Link } from "react-router-dom"
import ClickOutside from "react-click-outside"
import { performLogout } from "../auth/authDuck"

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
    }
  }

  render() {
    const { location, history, isLogged, performLogout } = this.props

    return (
      <>
        {isLogged && (
          <ClickOutside
            onClickOutside={() => {
              this.setState({ expanded: false })
            }}
          >
            <SideNav
              expanded={this.state.expanded}
              onToggle={(expanded) => {
                this.setState({ expanded })
              }}
              onSelect={(selected) => {
                const to = `/${selected}`
                if (location.pathname !== to) {
                  history.push(to)
                }
              }}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="dashboard">
                <NavItem eventKey="dashboard">
                  <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>
                    <Link to="/dashboard">Dashboard</Link>
                  </NavText>
                </NavItem>
                <NavItem eventKey="project">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-user-o"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>
                    <Link to="/project">Project View</Link>
                  </NavText>
                </NavItem>

                <NavItem eventKey="charts">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-line-chart"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Charts</NavText>
                  <NavItem eventKey="charts/linechart">
                    <NavText>Line Chart</NavText>
                  </NavItem>
                  <NavItem eventKey="charts/barchart">
                    <NavText>Bar Chart</NavText>
                  </NavItem>
                </NavItem>
                <NavItem onClick={performLogout} eventKey="login">
                  <NavIcon>
                    <i className="fa fa-sign-out" style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>Logout</NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
          </ClickOutside>
        )}
      </>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  isLogged: PropTypes.bool.isRequired,
  performLogout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({ isLogged: state.auth.isLogged })

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      performLogout,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
