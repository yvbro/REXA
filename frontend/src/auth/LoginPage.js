import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";

import {FormGroup, FormControl, FormLabel, Button, Container, Row, Col} from "react-bootstrap";

import "./Login.css";
import {performLogin} from "./authDuck";
import SocialLogin from "./SocialLogin"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    function validateForm() {
        return email.length > 3 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(performLogin(email, password)).then(() => history.push("/rexa/dashboard"));
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
