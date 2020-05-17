import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { addUser } from '../actions';

const Add = () => {
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  
  function handleSubmit(event) {
    dispatch(addUser(({ username: email, password })));
    event.preventDefault();
  }
  
  return (
    <Row>
      <Col className={`text-left`}>
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={e => setPassword(e.target.value)}
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
          Save User
          </Button>
        </form>
      </Col>
    </Row>
  );
};

export default Add;