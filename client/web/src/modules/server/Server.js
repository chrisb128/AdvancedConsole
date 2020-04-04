import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    function mainContent() {
        if (!!serverId) {
            return (
                <div>
                    <h2>{server.name}</h2>
                    <Events/>
                </div>
            )
        } else {
            return <p>Please select a server to view their events</p>;
        }
    }
    
    return (
        <div className={styles.app}>
            <div className={styles.listPane}>
                <List/>
            </div>
            <div className={styles.mainPane}>
                {mainContent()}
            </div>
        </div>
    );
}

export default Server;