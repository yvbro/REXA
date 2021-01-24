import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, Button, TextField, makeStyles } from '@material-ui/core';

import { updateSettings, testConnection } from '../api/apiSettings';
import { resetDataDashboard } from '../../dashboard/redux/dashboardDuck';
import { resetDataProjects } from '../../project/redux/projectDuck';
import { updateCurrentUserXnatInfos } from '../../auth/redux/authDuck';
import classes from './settings.module.scss';

const REGEX_PROTOCOL = /^((http|https):\/\/)/;
const ERROR_PASSWORD = "Password is required.";
const ERROR_HOST = 'Invalid host name (Must start by http(s))';

const useStyles = makeStyles((theme) => ({
    card: {
        width: 400,
        height: 450,
        borderRadius: '16px',
    },
    input: {
        margin: theme.spacing(1),
        width: 350,
    },
}));

const SettingsDetailsPage = () => {
    const style = useStyles();
    const dispatch = useDispatch();
    
    const { xnatUsername, xnatHost } = useSelector((state) => ({
        xnatUsername: state.auth.currentUser.xnatUsername,
        xnatHost: state.auth.currentUser.xnatHost,
    }));

    const [host, setHost] = useState(xnatHost);
    const [username, setUsername] = useState(xnatUsername);
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorHost, setErrorHost] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!password) {
            setErrorPassword(ERROR_PASSWORD);
        } else if (!host || !host.match(REGEX_PROTOCOL)) {
            setErrorHost(ERROR_HOST);
        } else {
            updateSettings(
                !username ? xnatUsername : username,
                !host ? xnatHost : host,
                password
            ).then(() => {
                dispatch(
                    updateCurrentUserXnatInfos(username, host)
                );
                dispatch(resetDataDashboard());
                dispatch(resetDataProjects());
            });
        }
    };

    const testCredentials = () => {
        if (!password) {
            setErrorPassword(ERROR_PASSWORD);
        } else {
            testConnection(username, host, password);
        }
    };

    const onChangeHost = (event) => {
        if(!event.target.value.match(REGEX_PROTOCOL)) {
            setErrorHost(ERROR_HOST);
        } else {
            setErrorHost('');
        }
        setHost(event.target.value);
    };

    return (
        <Grid container className={classes.rootDiv}>
            <Grid item md={6} xs={12}>
                <Card className={style.card}>
                    <div className={classes.textAlignCenter}>
                        <h1>
                            <span>Settings</span>
                        </h1>
                    </div>
                    <form
                        className={classes.formFlex}
                        onSubmit={handleSubmit}
                        key={`settingsForm_${xnatHost}_${xnatUsername}`}
                        id={`settingsForm_${xnatHost}_${xnatUsername}`}
                    >
                        <TextField
                            id="usernameSettings"
                            name="username"
                            label="username"
                            variant="outlined"
                            defaultValue={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={style.input}
                            inputProps={{
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                        />
                        <TextField
                            id="hostSettings"
                            name="host"
                            label="host"
                            variant="outlined"
                            defaultValue={host}
                            error={!!errorHost}
                            helperText={errorHost}
                            onChange={onChangeHost}
                            className={style.input}
                            inputProps={{
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                        />
                        <TextField
                            id="passwordSettings"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            error={!!errorPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            className={style.input}
                            helperText={errorPassword}
                            inputProps={{
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            disabled={
                                !host || !username || !password
                            }
                            className={style.input}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={style.input}
                            onClick={testCredentials}
                        >
                            test connection
                        </Button>
                    </form>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SettingsDetailsPage;
