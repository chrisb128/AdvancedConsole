import React from 'react';
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
                
            </Col>
            <Col className="ml-auto">
                <span className={styles.userName}>{ userName }</span>    
                <Icon.PeopleCircle className={styles.personIcon}/>
            </Col>
        </Row>
    );
};

export default Header;