import React from "react"
import "./Login.css"

import { Row, Col } from "react-bootstrap"
import FormLogin from "./FormLogin"

const LoginPage = () => (
  <section>
    <Row className="justify-content-md-center">
      <Col xs={3}>
        <FormLogin />
      </Col>
    </Row>
  </section>
)

export default LoginPage
