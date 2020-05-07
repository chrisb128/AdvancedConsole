import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { selectLoading, selectList } from './reducer';
import { setServerId } from '../actions';

import styles from './List.module.css';
import { selectServerId } from '../reducer';

const List = () => {

    const dispatch = useDispatch();

    const currentServerId = useSelector(selectServerId);
    const loading = useSelector(selectLoading);
    const list = useSelector(selectList);

    const onServerRowClicked = (item) => {
      dispatch(setServerId(item._id));
    };

    const getListItemClass = (item) => {
      const classes = [styles.listItem];
      if (item._id === currentServerId) {
        classes.push(styles.selectedItem);
      }

      return classes.join(' ');
    }

    return (
        <Row>
          <Col className={styles.list}>
            { loading && list.length === 0
            ? (
                <em>loading servers...</em>
            )
            : (
                list.map((item, index) => {
                    return (
                        <Row className={getListItemClass(item)} key={item._id} onClick={() => onServerRowClicked(item)}>
                            <Col>
                              <Row>
                                <Col>{item.name}</Col>
                              </Row>
                              <Row>
                                <Col className={styles.listHost}>{item.host}</Col>
                              </Row>
                              <Row>
                                <Col className={styles.lastSeen}>Last Seen: {moment(item.lastReportTime).format('ll LTS')}</Col>
                              </Row>
                            </Col>
                        </Row>
                    );
                })
            )}
          </Col>
        </Row>
    );
}

export default List;