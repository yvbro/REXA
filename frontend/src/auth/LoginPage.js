import React, {useState} from "react";
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import { toast } from "react-toastify";

import {FormGroup, FormControl, FormLabel, Button, Container, Row, Col} from "react-bootstrap";

import "./Login.css";
import {performLogin} from "./authDuck";
import SocialLogin from "./SocialLogin"
import {ACCESS_TOKEN} from "../constants";

export default function LoginPage(authenticated) {
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

        dispatch(performLogin(email, password)).then((response) => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            history.push("/rexa/dashboard");
        }).catch( error =>
            toast.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
        );
    }

    if(authenticated) {
        return <Redirect
            to={{
                pathname: "/rexa/dashboard",
                state: { from: location }
            }}/>;
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <div className="header">
                        <p className="welcome">Welcome{' '}</p>
                        <p className="to">to{' '}</p>
                        <p className="rexa"> ReXA</p>
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
                </Col>
            </Row>
        </Container>
    );
}
