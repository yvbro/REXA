import React, { useEffect,useState } from "react"

import { Container, Button, Form, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import { fetchSettings, updateSettings } from "../redux/settingsDuck"

export const SettingsDetails = () => {
  const dispatch = useDispatch()
  const { xnatUsername, xnatHost, loading } = useSelector((state) => ({
    xnatUsername: state.settings.xnatUser,
    xnatHost: state.settings.xnatHost,
    loading: state.settings.loading,
  }))
  const [disable, setDisable] = useState(false);
  const [newUsername, setNewUsername] = useState("admin");
  const [newHost, setNewHost] = useState("http://localhost");

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  function handleSubmit(event){
    event.preventDefault();

    updateSettings(newUsername, newHost)
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Form>
          <Form.Group as={Row} controlId="formXnatUsername">
            <Form.Label column sm="2">
              Xnat Username
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                defaultValue={xnatUsername}
                onChange={e => setNewUsername(e.target.value)}
                />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formXnatUrl">
            <Form.Label column sm="2">
              Xnat Url
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                defaultValue={xnatHost}
                onChange={e => setNewHost(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button disabled={disable} type="submit" size="lg">
            Save
          </Button>
        </Form>
      </form>
    </Container>
  )
}

export default SettingsDetails
