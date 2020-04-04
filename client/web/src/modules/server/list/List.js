import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoading, selectList } from './reducer';
import { setServerId } from '../actions';

import styles from './List.module.css';

const List = () => {

    const dispatch = useDispatch();

    const loading = useSelector(selectLoading);
    const list = useSelector(selectList);

    function rowClassName(index) {
        return index % 2 === 0
            ? styles.listItemEven
            : styles.listItemOdd;
    }

    return (
        <div>
            { loading 
            ? (
                <div><em>loading servers...</em></div>
            )
            : (
                list.map((item, index) => {
                    return (
                        <div className={rowClassName(index)}>
                            <span className={styles.listHost}>{item.host}</span>
                            <span className={styles.listName}>{item.name}</span>
                            <span className={styles.listActions}><button onClick={() => dispatch(setServerId(item._id))}>Events</button></span>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default List;