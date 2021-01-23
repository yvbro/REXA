import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, Button, TextField, makeStyles } from '@material-ui/core';

import { updateSettings, testConnection } from '../api/apiSettings';
import { resetDataDashboard } from '../../dashboard/redux/dashboardDuck';
import { resetDataProjects } from '../../project/redux/projectDuck';
import { updateCurrentUserXnatInfos } from '../../auth/redux/authDuck';
import classes from './settings.module.scss';

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
    const regexHttp = /^((http|https|ftp):\/\/)/;
    const { xnatUsername, xnatHost } = useSelector((state) => ({
        xnatUsername: state.auth.currentUser.xnatUsername,
        xnatHost: state.auth.currentUser.xnatHost,
    }));
    const [host, setHost] = useState(-1);
    const [username, setUsername] = useState(-1);
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorHost, setErrorHost] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!password) {
            setErrorPassword(false);
        } else if (
            (host !== -1 && !regexHttp.test(host)) ||
            !regexHttp.test(xnatHost)
        ) {
            setErrorHost(false);
        } else {
            updateSettings(
                username === -1 ? xnatUsername : username,
                host === -1 ? xnatHost : host,
                password
            ).then(() => {
                dispatch(
                    updateCurrentUserXnatInfos(
                        username === -1 ? xnatUsername : username,
                        host === -1 ? xnatHost : host
                    )
                );
                dispatch(resetDataDashboard());
                dispatch(resetDataProjects());
            });
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

    const onChangeHost = (event) => {
        regexHttp.test(event.target.value)
            ? setErrorHost(false)
            : setErrorHost(true);
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
                            defaultValue={xnatUsername}
                            onChange={(e) => setUsername(e.target.value)}
                            className={style.input}
                            inputProps={{
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                        />
                        <TextField
                            id="hostSettings"
                            name="host"
                            label="host"
                            variant="outlined"
                            defaultValue={xnatHost}
                            error={errorHost}
                            helperText={
                                errorHost ? 'Invalid host name (http/https)' : ''
                            }
                            onChange={onChangeHost}
                            className={style.input}
                            inputProps={{
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                        />
                        <TextField
                            id="passwordSettings"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            error={errorPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            className={style.input}
                            helperText="password is required."
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
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
