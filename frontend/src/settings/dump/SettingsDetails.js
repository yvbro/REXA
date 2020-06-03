import React, { useEffect,useState } from "react"

import { Button, Form, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import { fetchSettings } from "../redux/settingsDuck"

export const SettingsDetails = () => {
  const dispatch = useDispatch()
  const { xnatUsername, xnatHost, loading } = useSelector((state) => ({
    xnatUsername: state.settings.xnatUser,
    xnatHost: state.settings.xnatHost,
    loading: state.settings.loading,
  }))

  useEffect(() => {
    dispatch(fetchSettings())
  }, [dispatch])


  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Form>
      <Form.Group as={Row} controlId="formXnatUsername">
        <Form.Label column sm="2">
          Xnat Username
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            defaultValue={xnatUsername}
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
          />
        </Col>
      </Form.Group>

      <Button disabled={TextTrackCue} size="lg">
        Save
      </Button>
    </Form>
  )
}

export default SettingsDetails
