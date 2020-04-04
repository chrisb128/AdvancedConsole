import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { fetchEventsSuccess } from './actions';

import ApiService from '../../../apiService';

const api = (state$) => new ApiService(state$.value.auth.token);

const fetchEventsEpic = (actions$, state$) => actions$.pipe(
    filter(action => action.type === 'SERVER_EVENT_FETCH_EVENTS'),
    mergeMap(async (action) => {
        const response = await api(state$).getEvents(state$.value.server.server.serverId);
        return fetchEventsSuccess(response.data.events);
    }),
);

const eventsEpic = combineEpics(fetchEventsEpic);

export default eventsEpic;