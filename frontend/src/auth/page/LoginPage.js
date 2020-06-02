import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

import {Button, Container, FormControl, FormGroup, FormLabel} from "react-bootstrap";

import {performLogin} from "../redux/authDuck";
import SocialLogin from "../dumb/SocialLogin"
import {ACCESS_TOKEN} from "../../constants";

import style from "../dumb/auth.module.scss";

const LoginPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    function validateForm() {
        return email.length > 3 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(performLogin(email, password))
            .then((response) => {
                toast.info("Welcome to Rexa");
                localStorage.setItem(ACCESS_TOKEN, `Bearer ${response.value.data.accessToken}`);
                history.push("/rexa/dashboard");
            }).catch(() => {
            toast.error("Login failed: Invalid username or password.");
        });
    }

    if (location.state && location.state.error) {
        toast.error("This account is not allowed to sign in.");
        location.state.error = null;
    }

    if (props.authenticated) {
        return <Redirect
            to={{
                pathname: "/rexa/dashboard",
                state: {from: location}
            }}/>;
    }

    return (
        <Container className={style.containerLogin}>
            <div className={style.formDiv}>
                <div className={style.header}>
                    <h1>
                        <span className={style.blue30}>Welcome{' '}</span>
                        <span className={style.black15}>to{' '}</span>
                        <span className={style.red30}> ReXA</span>
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <Button block disabled={!validateForm()} type="submit">
                        Sign in
                    </Button>
                    <SocialLogin/>
                </form>
            </div>
        </Container>
    );
};

LoginPage.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default LoginPage;
