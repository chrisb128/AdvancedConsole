import { combineEpics } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { setServerId } from './actions';
import { fetchEvents } from './events/actions';

import listEpic from './list/epic';
import eventsEpic from './events/epic';

const setServerEpic = (action$) => action$.pipe(
    filter((action) => action.type === setServerId().type),
    map((action) => fetchEvents(action.serverId))
);

export default combineEpics(
    listEpic, eventsEpic,
    setServerEpic
);