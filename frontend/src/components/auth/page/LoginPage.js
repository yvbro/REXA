import React, { useState } from 'react';

import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Grid, Card, Button, TextField, makeStyles } from '@material-ui/core';

import { performLogin } from '../redux/authDuck';
import SocialLogin from '../dumb/SocialLogin';
import classes from '../dumb/auth.module.scss';

import { regexEmail } from '../../../helpers/constants/index';
import { borderRadius } from '../../common/theme/theme.scss';
import rexaLogo from '../../../assets/rexa-logo-svg.png';

const useStyles = makeStyles((theme) => ({
    card: {
        width: 400,
        height: 500,
        borderRadius: borderRadius,
    },
    input: {
        margin: theme.spacing(1),
        width: 350,
    },
}));

const LoginPage = () => {
    const style = useStyles();

    const { authenticated } = useSelector((state) => ({
        authenticated: state.auth.token !== null,
    }));

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(performLogin(email, password));
    };

    const onChangeEmail = (event) => {
        if (event.target.value.match(regexEmail)) {
            setEmail(event.target.value);
            setErrorEmail('');
        } else {
            setErrorEmail('Email invalid');
        }
    };

    if (location.state?.error) {
        toast.error(
            'This account is not allowed to sign in or the user has been disabled.'
        );
        location.state.error = null;
    }

    if (authenticated) {
        let redirectPath = '/rexa/dashboard';
        if (location?.state?.from) {
            redirectPath = location.state.from;
        }
        return <Redirect to={redirectPath} />;
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
                        <img
                            className={classes.imageLogo}
                            src={rexaLogo}
                            alt="ReXA Logo"
                        />
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

export default LoginPage;
