import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Grid, Card, Button, TextField, makeStyles } from '@material-ui/core';

import { performLogin } from '../redux/authDuck';
import SocialLogin from '../dumb/SocialLogin';
import { ACCESS_TOKEN } from '../../constants';

import style from '../dumb/auth.module.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
    },
    card: {
        width: 400,
        height: 350,
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
}));

// eslint-disable-next-line
const regexEmail = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const LoginPage = (props) => {
    const classes = useStyles();

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
            .catch(() => {
                toast.error('Login failed: Invalid username or password.');
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
        toast.error('This account is not allowed to sign in.');
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
            className={classes.root}
        >
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <div className={style.header}>
                        <h1>
                            <span className={style.blue30}>Welcome </span>
                            <span className={style.black15}>to </span>
                            <span className={style.red30}> ReXA</span>
                        </h1>
                    </div>
                    <form
                        className={classes.form}
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
                            className={classes.text}
                        />
                        <TextField
                            id="filled-password-input"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            className={classes.text}
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            disabled={!!errorEmail}
                            className={classes.button}
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
