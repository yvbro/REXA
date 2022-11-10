import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useLocation, NavLink as RouterLink } from 'react-router-dom';

import {
    List,
    ListItem,
    Collapse,
    Button,
    Drawer,
    Typography,
    makeStyles,
} from '@material-ui/core';

import ContactsTwoTone from '@material-ui/icons/ContactsTwoTone';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import rexaLogo from '../assets/rexa-logo-svg.png';
import themes from '../components/common/theme/theme.scss';

const useStyles = makeStyles(() => ({
    root: {
        justifyContent: 'left',
    },
    drawer: {
        paddingTop: '20px',
        width: '165px',
        backgroundColor: themes.themeColor,
    },
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        color: 'white',
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
    },
    selected: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: themes.themeColorHover,
    },
    btnRoot: {
        paddingLeft: '25px',
        justifyContent: 'left !important',
    },
    subMenu: {
        paddingLeft: '50px !important',
    },
    title: {
        paddingLeft: 10,
    },
    logoBottom: {
        position: 'fixed',
        bottom: 0,
    },
}));

const menuData = [
    {
        name: 'Dashboard',
        url: '/rexa/dashboard',
        icon: <DashboardIcon />,
        isAdmin: false,
    },
    {
        name: 'Project View',
        icon: <AccountTreeIcon />,
        url: '/rexa/project',
        needAdmin: false,
    },
    {
        name: 'Users Management',
        url: '/rexa/management',
        icon: <SupervisorAccountIcon />,
        needAdmin: true,
    },
    {
        name: 'Settings',
        icon: <SettingsIcon />,
        url: '/rexa/settings',
        needAdmin: false,
    },
    {
        name: 'About us',
        icon: <ContactsTwoTone />,
        url: '/rexa/aboutUs',
        needAdmin: false,
    },
    {
        name: 'Logout',
        icon: <ExitToAppIcon />,
        url: '/rexa/logout',
        needAdmin: false,
    },
];

function NavBar(props) {
    const { className, ...rest } = props;
    const classes = useStyles();

    const location = useLocation();

    const [menu, setMenu] = useState({});

    const { isAdmin, authenticated } = useSelector((state) => ({
        isAdmin: state.auth.user.isAdmin,
        authenticated: state.auth.token !== null,
    }));

    const handleClick = (item) => {
        const newData = { ...menu, [item]: !menu[item] };
        setMenu(newData);
    };

    if (!authenticated) {
        return null;
    }

    // eslint-disable-next-line react/display-name
    const CustomRouterLink = forwardRef((props, ref) => (
        <div ref={ref} style={{ flexGrow: 1 }}>
            <RouterLink {...props} />
        </div>
    ));

    const handleMenu = (children, level = 0) => {
        return children.map(({ children, name, url, icon, needAdmin }) => {
            if (needAdmin && !isAdmin) {
                return null;
            }

            const selected = location.pathname.startsWith(url);

            if (!children) {
                return (
                    <List component="div" disablePadding key={name}>
                        <ListItem
                            className={selected ? classes.selected : classes.item}
                            disableGutters
                            style={{ padding: '0px' }}
                            key={name}
                        >
                            <Button
                                className={clsx({
                                    [classes.btnRoot]: true,
                                    [classes.button]: true,
                                    [classes.subMenu]: level,
                                })}
                                component={CustomRouterLink}
                                to={url}
                            >
                                {icon}
                                <Typography className={classes.title}>
                                    {name}
                                </Typography>
                            </Button>
                        </ListItem>
                    </List>
                );
            }
            return (
                <div key={name}>
                    <ListItem
                        className={selected ? classes.selected : classes.item}
                        disableGutters
                        key={name}
                        onClick={() => handleClick(name)}
                    >
                        <Button
                            className={clsx({
                                [classes.btnRoot]: true,
                                [classes.button]: true,
                                [classes.subMenu]: level,
                            })}
                        >
                            {icon}
                            <Typography className={classes.title}>{name}</Typography>
                            {menu[name] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </ListItem>
                    <Collapse in={!!menu[name]} timeout="auto" unmountOnExit>
                        {handleMenu(children, 1)}
                    </Collapse>
                </div>
            );
        });
    };

    return (
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            open
            variant="persistent"
        >
            <List {...rest} className={clsx(classes.root, className)}>
                {handleMenu(menuData)}
            </List>
            <img
                className={classes.logoBottom}
                src={rexaLogo}
                alt="ReXA Logo"
                width="140"
                height="150"
            />
        </Drawer>
    );
}

NavBar.propTypes = {
    className: PropTypes.string,
};

export default NavBar;
