import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { selectAuthenticated } from './reducer';

import Header from '../header/Header';
import Login from './login/Login';
import ChangePassword from './changePassword/ChangePassword';

const Auth = () => {
  const authenticated = useSelector(selectAuthenticated);

  return (
    <Switch>
      <Route path="/client/auth/login">
        { authenticated ? <Redirect to="/client"/> : null }
        <Login/>
      </Route>
      <Route path="/client/auth/change-password">
        <Row>
          <Col>
            <Header/>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <ChangePassword/>
          </Col>
        </Row>
      </Route>
    </Switch>
  )
};

export default Auth;