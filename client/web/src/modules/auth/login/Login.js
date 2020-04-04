import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { login } from '../actions';

import styles from './Login.module.css';
import { selectLoggingIn, selectAuthenticated, selectUserName, selectLoginError } from '../reducer';

const Login = () => {
    const dispatch = useDispatch();

    const loggingIn = useSelector(selectLoggingIn);
    const authenticated = useSelector(selectAuthenticated);
    const userName = useSelector(selectUserName);
    const loginError = useSelector(selectLoginError);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
        console.log(event);
        dispatch(login(email, password));
        event.preventDefault();
    }

  function loginForm() {
    return (            
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
        <ControlLabel>Email</ControlLabel>
        <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
        <ControlLabel>Password</ControlLabel>
        <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
        />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
        Login
        </Button>
      </form>
    );
  }


  function loginView() {
    if (loggingIn) {
      return (<em>Logging in...</em>);
    } else if (!authenticated) {
      return (
        <div>
        {(!!loginError)?(<em className={styles.error}>{loginError}</em>):(null)}
        {loginForm()}
        </div>
      );
    } else {
      return (<span>Logged in: { userName }</span>);
    }
  }

  return (
    <div className={styles.login}>
      {loginView()}
    </div>
  );
};

export default Login;