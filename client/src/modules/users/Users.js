import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { fetchCurrent } from './actions';

import List from './list/List';
import User from './user/User';
import Add from './add/Add';

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCurrent());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route from="/client/users/add">
          <Row className={`justify-content-center`}>
            <Col xs={3}>
              <Add/>
            </Col>
          </Row>
        </Route>
        <Route from="/client/users/">
          <Row>
            <Col xs={3}>
              <List/>
            </Col>
            <Col>
              <User/>
            </Col>
          </Row>
        </Route>
      </Switch>
    </Router>
  );
};

export default Users;