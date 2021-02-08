import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ClickOutside from 'react-click-outside';

import style from '../components/common/common.module.scss';
import rexaLogo from '../assets/rexa-logo-svg.png';

const Header = () => {
    const [expanded, setExpanded] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const { isAdmin, authenticated } = useSelector((state) => ({
        isAdmin: state.auth.user.isAdmin,
        authenticated: state.auth.token !== null,
    }));

    return (
        <>
            {authenticated && (
                <ClickOutside onClickOutside={() => setExpanded(false)}>
                    <SideNav
                        className={style.navBar}
                        expanded={expanded}
                        onToggle={(expanded) => {
                            setExpanded(expanded);
                        }}
                        onSelect={(selected) => {
                            const to = `/${selected}`;
                            if (location.pathname !== to) {
                                history.push(to);
                            }
                        }}
                    >
                        <SideNav.Toggle />
                        <SideNav.Nav>
                            <NavItem
                                eventKey="rexa/dashboard"
                                active={location.pathname.startsWith(
                                    '/rexa/dashboard'
                                )}
                            >
                                <NavIcon>
                                    <i
                                        className="fa fa-fw fa-home"
                                        style={{ fontSize: '1.75em' }}
                                    />
                                </NavIcon>
                                <NavText>
                                    <Link to="rexa/dashboard">Dashboard</Link>
                                </NavText>
                            </NavItem>

                            <NavItem
                                eventKey="rexa/project"
                                active={location.pathname.startsWith(
                                    '/rexa/project'
                                )}
                            >
                                <NavIcon>
                                    <i
                                        className="fa fa-vcard"
                                        style={{ fontSize: '1.75em' }}
                                    />
                                </NavIcon>
                                <NavText>
                                    <Link to="rexa/project">Project View</Link>
                                </NavText>
                            </NavItem>

                            <NavItem
                                eventKey="rexa/settings"
                                active={location.pathname.startsWith(
                                    '/rexa/settings'
                                )}
                            >
                                <NavIcon>
                                    <i
                                        className="fa fa-cogs"
                                        aria-hidden="true"
                                        style={{ fontSize: '1.75em' }}
                                    />
                                </NavIcon>
                                <NavText>
                                    <Link to="rexa/settings">User settings</Link>
                                </NavText>
                            </NavItem>

                            {isAdmin && (
                                <NavItem
                                    eventKey="rexa/management"
                                    active={location.pathname.startsWith(
                                        '/rexa/management'
                                    )}
                                >
                                    <NavIcon>
                                        <i
                                            className="fa fa-users"
                                            aria-hidden="true"
                                            style={{ fontSize: '1.75em' }}
                                        />
                                    </NavIcon>
                                    <NavText>
                                        <Link to="rexa/management">
                                            Users Management
                                        </Link>
                                    </NavText>
                                </NavItem>
                            )}

                            <NavItem eventKey="rexa/logout">
                                <NavIcon>
                                    <i
                                        className="fa fa-sign-out"
                                        style={{ fontSize: '1.75em' }}
                                    />
                                </NavIcon>
                                <NavText>Logout</NavText>
                            </NavItem>
                            <img
                                className="logoBottom"
                                src={rexaLogo}
                                alt="ReXA Logo"
                                width="70"
                                height="75"
                            />
                        </SideNav.Nav>
                    </SideNav>
                </ClickOutside>
            )}
        </>
    );
};

export default Header;
