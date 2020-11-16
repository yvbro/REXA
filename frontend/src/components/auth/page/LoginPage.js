import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import _get from 'lodash/get';

import { Grid, Card, Button, TextField, makeStyles } from '@material-ui/core';

import { performLogin } from '../redux/authDuck';
import SocialLogin from '../dumb/SocialLogin';
import { ACCESS_TOKEN } from '../../../helpers/constants';
import classes from '../dumb/auth.module.scss';

import { regexEmail } from '../../../helpers/constants/index';
import rexaLogo from "../../../assets/rexa-logo-svg.png";

const useStyles = makeStyles((theme) => ({
    card: {
        width: 400,
        height: 500,
        borderRadius: '16px',
    },
    input: {
        margin: theme.spacing(1),
        width: 350,
    },
}));

const LoginPage = (props) => {
    const style = useStyles();

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(performLogin(email, password))
            .then((response) => {
                toast.info('Welcome to Rexa');
                localStorage.setItem(
                    ACCESS_TOKEN,
                    `Bearer ${response.value.data.accessToken}`
                );
                history.push('/rexa/dashboard');
            })
            .catch((error) => {
                let errorMessage = _get(error, 'response.data.message', null);
                if (!errorMessage || errorMessage !== "User is disabled") {
                    errorMessage = "Invalid username or password";
                }
                toast.error(`Unsuccessful login attempt: ${errorMessage}`);
            });
    };

    const onChangeEmail = (event) => {
        if (event.target.value.match(regexEmail)) {
            setEmail(event.target.value);
            setErrorEmail('');
        } else {
            setErrorEmail('Email invalid');
        }
    };

    if (location.state && location.state.error) {
        toast.error('This account is not allowed to sign in or the user has been disabled.');
        location.state.error = null;
    }

    if (props.authenticated) {
        return (
            <Redirect
                to={{
                    pathname: '/rexa/dashboard',
                    state: { from: location },
                }}
            />
        );
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.rootDiv}
        >
            <Grid item xs={3}>
                <Card className={style.card}>
                    <div className={classes.centered}>
                        <img className={classes.imageLogo} src={rexaLogo} alt="ReXA Logo"/>
                    </div>
                    <form
                        className={classes.centered}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            id="outlined-basic"
                            type="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            error={!!errorEmail}
                            helperText={errorEmail}
                            onChange={onChangeEmail}
                            className={style.input}
                        />
                        <TextField
                            id="filled-password-input"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            className={style.input}
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            disabled={!!errorEmail}
                            className={style.input}
                        >
                            Sign in
                        </Button>
                        <SocialLogin />
                    </form>
                </Card>
            </Grid>
        </Grid>
    );
};

LoginPage.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default LoginPage;
