export const fetchEvents = () => ({ type: 'SERVER_EVENT_FETCH_EVENTS' });
export const fetchEventsSuccess = (events) => ({ type: 'SERVER_EVENT_FETCH_EVENTS_SUCCESS', events });
export const fetchNextEventsPage = () => ({ type: 'SERVER_EVENT_FETCH_NEXT_EVENTS_PAGE' });
export const fetchNextEventsPageSuccess = (events) => ({ type: 'SERVER_EVENT_FETCH_NEXT_EVENTS_PAGE_SUCCESS', events });