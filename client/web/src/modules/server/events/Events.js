import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectList, selectLoading } from './reducer';

import Event from './event/Event';

import { fetchNextEventsPage } from './actions';

const Events = () => {
  
    const dispatch = useDispatch();

    const loading = useSelector(selectLoading);
    const list = useSelector(selectList);

    function onLoadMoreClicked(event) {
      dispatch(fetchNextEventsPage());
      event.preventDefault();
    }

    return (
      <div>
        <div>
          Filter By Type: 
        </div>
        <div>
            {
                list.map(item => {
                    return (<Event item={item}/>);
                })
            }
            {
              loading
              ? (<div>Loading ...</div>)
              : (<div><button onClick={(event) => onLoadMoreClicked(event)}>Load More</button></div>)
            }            
        </div>
      </div>
    );
};

export default Events;