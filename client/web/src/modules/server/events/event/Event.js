import React from 'react';
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
    }
  }

  return (
    <div className={styles.eventItem}>
      <span className={styles.eventTime}>{moment(item.time).format('ll LTS')}</span>
      <span className={styles.eventType}>{typeDescription(item.type)}</span>
      { item.player ? (<span className={styles.eventPlayer}>{item.player.username} ({item.player.uuid})</span>) : (null) }
      <span className={styles.eventMessage}>{item.message}</span>
    </div>
  )
};

export default Event;