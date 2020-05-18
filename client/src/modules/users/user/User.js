import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

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
        {
          (authUserId === userId)
          ? (
            <Row>
              <Col>
                <Link to="/client/auth/change-password">Change Password</Link>
              </Col>
            </Row>
          ) : null
        }
      </Col>
    </Row>
  );
};

export default User;