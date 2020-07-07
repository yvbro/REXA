import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav"
import { Link, useHistory, useLocation } from "react-router-dom"
import ClickOutside from "react-click-outside"
import { performLogout } from "../auth/redux/authDuck"
import { ACCESS_TOKEN } from "../constants"
import { toast } from "react-toastify"

import style from "../common/common.module.scss"

const Header = (props) => {
  const [expanded, setExpanded] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const handleLogOut = (event) => {
    event.preventDefault()

    dispatch(performLogout())
      .then(() => {
        toast.info("Logged out")
        localStorage.removeItem(ACCESS_TOKEN)
        history.push("/rexa/login")
      })
      .catch(() => {
        toast.error("Could not log out")
      })
  }

  return (
    <>
      {props.authenticated && (
        <ClickOutside onClickOutside={() => setExpanded(false)}>
          <SideNav
            className={style.navBar}
            expanded={expanded}
            onToggle={(expanded) => {
              setExpanded(expanded)
            }}
            onSelect={(selected) => {
              const to = `/${selected}`
              if (location.pathname !== to) {
                history.push(to)
              }
            }}
          >
            <SideNav.Toggle />
            <SideNav.Nav>
              <NavItem
                eventKey="rexa/dashboard"
                active={props.location.pathname.startsWith("/rexa/dashboard")}
              >
                <NavIcon>
                  <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
                </NavIcon>
                <NavText>
                  <Link to="rexa/dashboard">Dashboard</Link>
                </NavText>
              </NavItem>

              <NavItem
                eventKey="rexa/project"
                active={props.location.pathname.startsWith("/rexa/project")}
              >
                <NavIcon>
                  <i className="fa fa-fw fa-user-o" style={{ fontSize: "1.75em" }} />
                </NavIcon>
                <NavText>
                  <Link to="rexa/project">Project View</Link>
                </NavText>
              </NavItem>

              <NavItem
                eventKey="rexa/settings"
                active={props.location.pathname.startsWith("/rexa/settings")}
              >
                <NavIcon>
                  <i
                    className="fa fa-cogs"
                    aria-hidden="true"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText>
                  <Link to="rexa/project">User settings</Link>
                </NavText>
              </NavItem>

              <NavItem onClick={handleLogOut} eventKey="logout">
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

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

export default Header
