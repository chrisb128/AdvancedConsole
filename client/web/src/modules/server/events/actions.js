export const fetchEvents = () => ({ type: 'SERVER_EVENT_FETCH_EVENTS' });
export const fetchEventsSuccess = (events) => ({ type: 'SERVER_EVENT_FETCH_EVENTS_SUCCESS', events: events });