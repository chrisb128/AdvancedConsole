import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { login } from '../actions';

import styles from './Login.module.css';
import { selectLoggingIn, selectLoginError } from '../reducer';

const Login = () => {
    const dispatch = useDispatch();

    const loggingIn = useSelector(selectLoggingIn);
    const loginError = useSelector(selectLoginError);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
        dispatch(login(email, password));
        event.preventDefault();
    }

  function loginForm() {
    return (            
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
        <Button block disabled={!validateForm()} type="submit">
        Login
        </Button>
      </form>
    );
  }


  function loginView() {
    if (loggingIn) {
      return (<em>Logging in...</em>);
    } else  {
      return (
        <div>
        {(!!loginError)?(<em className={styles.error}>{loginError}</em>):(null)}
        {loginForm()}
        </div>
      );
    }
  }

  return (
    <div className={styles.login}>
      {loginView()}
    </div>
  );
};

export default Login;