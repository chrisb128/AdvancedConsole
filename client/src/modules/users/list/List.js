import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

import { fetchList } from '../actions';
import { selectUserList } from '../reducer';

import styles from './List.module.css';

const List = () => {
    const dispatch = useDispatch();

    const users = useSelector(selectUserList);

    useEffect(() => {
        dispatch(fetchList());
    }, [dispatch]);

    return (
        <Row>
            <Col className={`text-left`}>
                {
                    users.map(user => (                    
                        <Row key={ user.id } className={styles.userItem}>
                            <Col>{ user.username }</Col>
                        </Row>
                    ))
                }
                <Row key="add">
                    <Col>
                        <Button><Icon.Plus/> Add New User</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default List;