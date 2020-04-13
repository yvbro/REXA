import React from 'react'
import "./Login.css";

import FormLogin from "./FormLogin";
import { Row, Col } from "react-bootstrap";

const LoginPage = () => (
  <section>
    <Row className="justify-content-md-center">
      <Col xs={3} >
        <FormLogin/>
      </Col>
    </Row>
  </section>
);

export default LoginPage;