import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, Button, TextField, makeStyles } from '@material-ui/core';

import AppLayout from '../../app/AppLayout';

import {
    fetchSettings,
    updateSettings,
    testConnection,
} from '../redux/settingsDuck';
import LoadingIndicator from '../../common/LoadingIndicator';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: 400,
        height: 450,
        borderRadius: '16px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        margin: theme.spacing(1),
        width: 350,
    },
    button: {
        width: 350,
        margin: theme.spacing(1),
    },
    header: {
        textAlign: 'center',
    },
}));

export const SettingsDetailsPage = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { xnatUsername, xnatHost, loading } = useSelector((state) => ({
        xnatUsername: state.settings.xnatUser,
        xnatHost: state.settings.xnatHost,
        loading: state.settings.loading,
    }));
    const [username, setUsername] = useState(-1);
    const [host, setHost] = useState(-1);
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);

    useEffect(() => {
        dispatch(fetchSettings());
    }, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!password) {
            setErrorPassword(true);
        } else {
            updateSettings(
                username === -1 ? xnatUsername : username,
                host === -1 ? xnatHost : host,
                password
            );
        }
    };

    const testCredentials = () => {
        if (!password) {
            setErrorPassword(true);
        } else {
            testConnection(
                username === -1 ? xnatUsername : username,
                host === -1 ? xnatHost : host,
                password
            );
        }
    };

    return (
        <AppLayout>
            <Grid container className={classes.root}>
                <Grid item md={6} xs={12}>
                    <Card className={classes.card}>
                        <div className={classes.header}>
                            <h1>
                                <span>Settings</span>
                            </h1>
                        </div>
                        <form
                            className={classes.form}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                id="username-id"
                                name="username"
                                label="username"
                                variant="outlined"
                                defaultValue={xnatUsername}
                                onChange={(e) => setUsername(e.target.value)}
                                className={classes.text}
                            />
                            <TextField
                                id="host-id"
                                name="host"
                                label="host"
                                variant="outlined"
                                defaultValue={xnatHost}
                                onChange={(e) => setHost(e.target.value)}
                                className={classes.text}
                            />
                            <TextField
                                id="filled-password-input"
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                error={errorPassword}
                                onChange={(e) => setPassword(e.target.value)}
                                className={classes.text}
                                helperText="password is required."
                            />
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                disabled={
                                    (host === -1 || host === xnatHost) &&
                                    (username === -1 || username === xnatUsername) &&
                                    !password
                                }
                                className={classes.button}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                                onClick={testCredentials}
                            >
                                test connection
                            </Button>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </AppLayout>
    );
};

export default SettingsDetailsPage;
