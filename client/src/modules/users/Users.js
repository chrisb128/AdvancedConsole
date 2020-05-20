import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

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
    <Switch>
      <Route path="/client/users/add">
        <Row>
          <Col xs={3}>
            <Add/>
          </Col>
        </Row>
      </Route>
      <Route path="/client/users">
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
  );
};

export default Users;