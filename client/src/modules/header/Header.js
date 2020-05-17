import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

import { selectUserName } from '../login/reducer';

import styles from './Header.module.css'; 

const Header = () => {
    const userName = useSelector(selectUserName);

    return (
        <Row className={`${styles.header} justify-content-between`}>
            <Col>
                <Link to="/client"><Icon.House/></Link>
            </Col>
            <Col className="ml-auto">
                <span className={styles.userName}>{ userName }</span>
                
                <Link to="/client/me"><Icon.PeopleCircle className={styles.personIcon}/></Link>
            </Col>
        </Row>
    );
};

export default Header;