import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { selectUserId, selectUserName, selectLastLoginDate } from './reducer';
import { fetchCurrent } from './actions';

const MyUser = () => {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const userName = useSelector(selectUserName);
    const lastLoginDate = useSelector(selectLastLoginDate);

    useEffect(() => {
        dispatch(fetchCurrent());
    });

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

export default MyUser;