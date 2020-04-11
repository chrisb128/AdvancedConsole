import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import List from './list/List';
import Events from './events/Events';

import { fetchServers } from './list/actions';
import { selectServerId, selectServerInfo } from './reducer';

import styles from './Server.module.css';


const Server = () => {

    const dispatch = useDispatch();
    const serverId = useSelector(selectServerId)
    const server = useSelector(selectServerInfo(serverId));

  
    useEffect(() => {
      dispatch(fetchServers());
    }, [dispatch]);

    useEffect(() => {
      const timer = setInterval(
        () => dispatch(fetchServers()),
        5000
      );
      return () => clearInterval(timer);
    }, [dispatch]);

    function mainContent() {
        if (!!serverId) {
            return (
              <Row>
                <Col>
                  <Row>
                    <Col xs={3}><h2>{server.name}</h2></Col>
                    <Col>
                      <Row>
                        <Col>Users:</Col>
                      </Row>
                      {
                        server.users.map(user => {
                          return (<Row><Col>{user.username}</Col></Row>);
                        })
                      }
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Events/>
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
        } else {
            return <p>Please select a server to view their events</p>;
        }
    }
    
    return (
      <Row>
        <Col xs={3} className={styles.list}>
          <List/>
        </Col>
        <Col xs={9} className={styles.mainContent}>          
          {mainContent()}
        </Col>
      </Row>
    );
}

export default Server;