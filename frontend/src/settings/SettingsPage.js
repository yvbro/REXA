import PropTypes from "prop-types";
import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import AppLayout from "../app/AppLayout";

const SettingsPage = (props) => {

  return (
    <AppLayout>
      <Form>
        <Form.Group as={Row} controlId="formXnatUsername">
          <Form.Label column sm="2">
            Xnat Username
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" defaultValue="Xnat Username" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formXnatPassword">
          <Form.Label column sm="2">
            Xnat Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Xnat Password" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formXnatUrl">
          <Form.Label column sm="2">
            Xnat Url
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" defaultValue="Xnat Url" />
          </Col>
        </Form.Group>

        <Button  disabled={true} size="lg" >
          Save
        </Button>
        <Button onClick={true} variant="outline-primary" size="lg">Edit</Button>

      </Form>
    </AppLayout>

  );
};

export default SettingsPage;