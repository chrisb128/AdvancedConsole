import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { selectUserId, selectUserName, selectLastLoginDate } from '../reducer';

const User = () => {
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const lastLoginDate = useSelector(selectLastLoginDate);

  return (
    <Row>
      <Col className={`text-left`}>
        <p>ID: { userId }</p>
        <p>User: { userName }</p>
        <p>Last Login: { lastLoginDate }</p>
        <p>
          Change Password:
        </p>
      </Col>
    </Row>
  );
};

export default User;