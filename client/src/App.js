import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './modules/login/Login';
import Home from './modules/home/Home';

import './App.css';
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
          <Route path="/client">
            { authenticated 
                  ? null : <Redirect to="/client/login"/> }
            <Home/>
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
