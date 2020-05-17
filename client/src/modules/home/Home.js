import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Header from '../header/Header';
import Users from '../users/Users';
import Server from '../server/Server';

const Home = () => {
  return (
    <Router>
      <Row>
        <Col>
          <Header/>
        </Col>
      </Row>
      <Switch>
        <Route path="/client/users">
          <Row>
            <Col>
              <Users/>
            </Col>
          </Row>
        </Route>
        <Route path="/client">
          <Row>
            <Col>
              <Server/> 
            </Col>
          </Row>
        </Route>
      </Switch>
    </Router>
  );
};

export default Home;