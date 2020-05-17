import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

import { fetchList, setCurrentUser } from '../actions';
import { selectUserList, selectUserId } from '../reducer';

import styles from './List.module.css';

const List = () => {
  const dispatch = useDispatch();
  
  const users = useSelector(selectUserList);
  const currentId = useSelector(selectUserId);
  
  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);
  
  const onUserClicked = (user) => {
    dispatch(setCurrentUser(user));
  };
  
  const getItemClass = (id) => {
    return `${ styles.listItem } ${ currentId === id ? styles.selectedItem : '' }`;
  }
  
  return (
    <Row>
      <Col className={`text-left`}>
        {
          users.map(user => (                    
            <Row key={ user.id } className={getItemClass(user.id)} onClick={() => onUserClicked(user)}>
              <Col>{ user.username }</Col>
            </Row>
          ))
        }
        <Row key="add">
          <Col>
            <Link to="/client/users/add"><Icon.Plus/> Add New User</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default List;