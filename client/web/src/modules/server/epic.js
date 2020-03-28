import { combineEpics } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { fetchEvents } from './events/actions';

import listEpic from './list/epic';
import eventsEpic from './events/epic';

const setServerEpic = (action$) => action$.pipe(
    filter((action) => action.type === 'SERVER_SET_SERVERID'),
    map((action) => fetchEvents(action.serverId))
);

export default combineEpics(
    listEpic, eventsEpic,
    setServerEpic
);