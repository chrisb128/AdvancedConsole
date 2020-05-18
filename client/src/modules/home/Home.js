import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Header from '../header/Header';
import Users from '../users/Users';
import Server from '../server/Server';

const Home = () => {
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <Header/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Switch>
              <Route path="/client/users">
                <Users/>
              </Route>
              <Route path="/client/servers">
                <Server/> 
              </Route>
              <Route exact path="/client">
                <Redirect to="/client/servers"/>
              </Route>
            </Switch>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;