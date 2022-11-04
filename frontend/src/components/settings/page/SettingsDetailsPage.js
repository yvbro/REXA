import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { Grid, AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';

import XnatSettingsForm from '../smart/XnatSettingsForm';
import UserSettingsForm from '../smart/UserSettingsForm';

import { GOOGLE_AUTH_PROVIDER } from '../../../helpers/constants/index';
import classes from './SettingsDetails.module.scss';
import themes from '../../common/theme/theme.scss';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} style={{ padding: '0px' }}>
                    <Typography component="span">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

function SettingsDetailsPage() {
    const [value, setValue] = useState(0);

    const { authProvider } = useSelector((state) => ({
        authProvider: state.auth.authProvider,
    }));

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const isGoogleAuthProvider = authProvider !== GOOGLE_AUTH_PROVIDER;

    return (
        <Grid container className={classes.rootDiv}>
            <Grid item md={6} xs={12}>
                <div className={classes.rootDiv}>
                    <AppBar
                        position="static"
                        style={{ background: themes.themeColor }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            indicatorColor="primary"
                        >
                            <Tab label="Xnat Settings" {...a11yProps(0)} />
                            {isGoogleAuthProvider && (
                                <Tab label="User Settings" {...a11yProps(1)} />
                            )}
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <XnatSettingsForm />
                    </TabPanel>
                    {isGoogleAuthProvider && (
                        <TabPanel value={value} index={1}>
                            <UserSettingsForm />
                        </TabPanel>
                    )}
                </div>
            </Grid>
        </Grid>
    );
}

export default SettingsDetailsPage;
