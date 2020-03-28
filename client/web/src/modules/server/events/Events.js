import React from 'react';
import { useSelector } from 'react-redux';
import { selectList } from './reducer';

const Events = () => {

    const list = useSelector(selectList);

    const typeDescription = (type) => {
        switch(type) {
            default:
            case 0: return 'None';
            case 1: return 'Startup';
            case 2: return 'Shutdown';
            case 3: return 'Keep Alive';
            case 4: return 'Player Join';
            case 5: return 'Player Disconnect';
            case 6: return 'Player Chat';            
        }
    }

    return (
        <table>
            {
                list.map(item => {
                    return (
                    <tr>
                        <td>{item.time}</td>
                        <td>{typeDescription(item.type)}</td>
                        <td>{item.message}</td>
                    </tr>
                    );
                })
            }
        </table>
    )
};

export default Events;