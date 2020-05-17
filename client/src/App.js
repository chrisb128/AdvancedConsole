import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './modules/login/Login';
import Server from './modules/server/Server';
import Header from './modules/header/Header';
import MyUser from './modules/myUser/MyUser';

import './App.css';
import { useSelector } from 'react-redux';
import { selectAuthenticated } from './modules/login/reducer';


function App() {
  const authenticated = useSelector(selectAuthenticated);

  useEffect(() => {
    document.title = 'Advanced Console';
  });
  
  return (
    <Router>
      <Container fluid className="App">
        <Switch>
          <Route path="/client/login">
            { authenticated 
            ? <Redirect to="/client"/> : null }
            <Row>
              <Col>
                <Login/>
              </Col>        
            </Row>
          </Route>
          <Route path="/client/me">
            <Row>
              <Col>
                <Header/>
              </Col>
            </Row>
            <Row>
              <Col>
                <MyUser/>
              </Col>
            </Row>
          </Route>
          <Route path="/client">
            { authenticated 
            ? null : <Redirect to="/client/login"/> }
            <Row>
              <Col>
                <Header/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Server/> 
              </Col>
            </Row>
          </Route>
          <Route path="/">
            <Redirect to="/client"/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}


export default App;
