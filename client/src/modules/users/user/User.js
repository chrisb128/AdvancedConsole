import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

import { selectUserId as selectAuthUserId } from '../../auth/reducer';
import { selectUserId, selectUserName, selectLastLoginDate } from '../reducer';

const User = () => {

  const authUserId = useSelector(selectAuthUserId);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const lastLoginDate = useSelector(selectLastLoginDate);

  return (
    <Row>
      <Col className={`text-left`}>
        <Row>
          <Col>ID: { userId }</Col>
        </Row>
        <Row>
          <Col>User: { userName }</Col>
        </Row>
        <Row>
          <Col>Last Login: { lastLoginDate }</Col>
        </Row>
        <Row>
          <Col>
          {
            (authUserId === userId)
            ? (
              <Link to="/client/auth/change-password">Change Password</Link>
            ) : (
              <Button><Icon.Trash/> Delete User</Button>
            )
          }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default User;