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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>IP/Host</th>
                        <th>Online</th>
                        <th>Events</th>
                    </tr>
                </thead>
                <tbody>
                    { loading 
                    ? (
                        <tr>
                            <td colSpan="4"><em>loading servers...</em></td>
                        </tr>
                    )
                    : (
                        list.map((item, index) => {
                            return (
                                <tr key={index} className={rowClassName(index)}>
                                    <td>{item.name}</td>
                                    <td>{item.host}</td>
                                    <td>{item.status}</td>
                                    <td><button onClick={() => dispatch(setServerId(item._id))}>Events</button></td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default List;