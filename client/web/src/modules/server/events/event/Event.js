import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import styles from './Event.module.css';

const Event = (props) => {

  const item = props.item;
  
  const typeDescription = (type) => {
    switch (type) {
      default: return 'Unknown';
      case 0: return 'None';
      case 1: return 'Startup';
      case 2: return 'Shutdown';
      case 3: return 'Player Join';
      case 4: return 'Player Disconnect';
      case 5: return 'Player Chat';
      case 6: return 'Block Break';
      case 7: return 'Block Place';
      case 8: return 'World Load';
      case 9: return 'World Save';
      case 10: return 'World Unload';
      case 11: return 'Chunk Load';
      case 12: return 'Chunk Unload';
      case 13: return 'Item Pickup';
      case 14: return 'Item Drop';
    }
  }

  return (
    <Row>
      <Col xs={2} className={styles.eventTime}>{moment(item.time).format('ll LTS')}</Col>
      <Col xs={2} className={styles.eventType}>{typeDescription(item.type)}</Col>
      <Col xs={2} className={styles.eventPlayer}>{item.player ? (<span tooltip={item.player.uuid}>{item.player.username}</span>) : (<em>No Player Data</em>)}</Col>
      <Col xs={6} className={styles.eventMessage}>{item.message}</Col>
    </Row>
  )
};

export default Event;