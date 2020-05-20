import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './modules/auth/Auth';
import Home from './modules/home/Home';

import './App.css';
import { selectAuthenticated } from './modules/auth/reducer';

import history from './app/history';


function App() {
  const authenticated = useSelector(selectAuthenticated);

  useEffect(() => {
    document.title = 'Advanced Console';
  });
  
  return (
    <Router history={history}>
      <Container fluid className="App">
        <Row>
          <Col>
              <Switch>
                <Route path="/client/auth">
                  <Auth/>
                </Route>
                <Route path="/client">
                  { authenticated ? null : <Redirect to="/client/auth/login"/> }
                  <Home/>
                </Route>
                <Route exact path="/">
                  { authenticated ? <Redirect to="/client"/> : <Redirect to="/client/auth/login"/> }                  
                </Route>
              </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}


export default App;
