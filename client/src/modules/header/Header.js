import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

import { logout } from '../login/actions';
import { selectUserName } from '../login/reducer';

import styles from './Header.module.css'; 

const Header = () => {

  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);

  const onLogoutClicked = () => {
    dispatch(logout());
  };

  return (
    <Row className={`${styles.header} justify-content-end`}>
      <Col>
        <Row>
          <Col xs={1}>
            <Link to="/client" className={styles.navIcon}><Icon.House/> Home</Link>
          </Col>
          <Col xs={1}>        
            <Link to="/client/users"><Icon.PeopleCircle className={styles.navIcon}/> Users</Link>
          </Col>
        </Row>
      </Col>
      <Col xs={1}>
        { userName }
      </Col>
      <Col xs={1}>        
        <Button onClick={() => onLogoutClicked()}>Logout</Button>
      </Col>
    </Row>
  );
};

export default Header;