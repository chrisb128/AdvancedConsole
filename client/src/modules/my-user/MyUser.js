import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { selectUserName } from '../login/reducer';

const MyUser = () => {
    const userName = useSelector(selectUserName);

    return (
        <Row>
            <Col>
                <h3>User: { userName }</h3>
            </Col>
        </Row>
    );
};

export default MyUser;