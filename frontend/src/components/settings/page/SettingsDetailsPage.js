import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { Grid, AppBar, Box, Tab, Tabs, Typography} from '@material-ui/core';

import XnatSettingsForm from '../smart/XnatSettingsForm';
import UserSettingsForm from '../smart/UserSettingsForm';

import classes from './SettingsDetails.module.scss';

const TabPanel = (props) => {
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
                <Box p={3} style={{padding: '0px'}}>
                <Typography component={'span'}>{children}</Typography>
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

const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

const SettingsDetailsPage = () => {
    
    const [value, setValue] = React.useState(0);

    const { authProvider } = useSelector((state) => ({
        authProvider: state.auth.authProvider,
    }));

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const isGoogleAuthProvider = authProvider !== 'google';

    return (
        <Grid container className={classes.rootDiv}>
            <Grid item md={6} xs={12}>
                <div className={classes.rootDiv}>
                    <AppBar position="static" style={{ background: '#2b78e3', width: '400px' }}>
                        <Tabs value={value} onChange={handleChange} indicatorColor="primary">
                            <Tab label="Xnat Settings" {...a11yProps(0)} />
                            {isGoogleAuthProvider && <Tab label="User Settings" {...a11yProps(1)} />}
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}><XnatSettingsForm /></TabPanel>
                    {isGoogleAuthProvider && <TabPanel value={value} index={1}><UserSettingsForm /></TabPanel>}
                </div>
            </Grid>
        </Grid>
    );
};

export default SettingsDetailsPage;
