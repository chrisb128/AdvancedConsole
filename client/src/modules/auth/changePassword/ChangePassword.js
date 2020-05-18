import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

import { updatePassword } from '../actions';
import { selectUserName } from '../reducer';

const ChangePassword = () => {

  const dispatch = useDispatch();

  const userName = useSelector(selectUserName)

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  function handleSubmit(event) {
    dispatch(updatePassword(oldPassword, newPassword));
    event.preventDefault();
  }

  const validateForm = () => {
    return oldPassword.length > 0 && newPassword.length > 0 && newPassword === confirmPassword;
  };

  return (
    <Row>
      <Col className={`text-left`}>
        <Card>
          <Card.Header>Changing password for { userName }</Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <Form.Group controlId="oldPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  type="password"
                  />
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  type="password"
                  />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  type="password"
                  />
              </Form.Group>
              <Button block disabled={!validateForm()} type="submit">
              Update Password
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
};

export default ChangePassword;