import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { fetchNextEventsPage, fetchNextEventsPageSuccess, fetchEvents, fetchEventsSuccess } from './actions';

import ApiService from '../../../apiService';

const api = (state$) => new ApiService(state$.value.auth.token);

const fetchEventsEpic = (actions$, state$) => actions$.pipe(
    filter(action => action.type === fetchEvents().type),
    mergeMap(async (action) => {
        const response = await api(state$).getEvents(state$.value.server.server.serverId, state$.value.server.events.pageSize, 0);
        return fetchEventsSuccess(response.data.events);
    }),
);

const fetchNextEventsPageEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === fetchNextEventsPage().type),
  mergeMap(async (action) => {
      const response = await api(state$).getEvents(state$.value.server.server.serverId, state$.value.server.events.pageSize, state$.value.server.events.list.length);
      return fetchNextEventsPageSuccess(response.data.events);
  }),
)

const eventsEpic = combineEpics(fetchEventsEpic, fetchNextEventsPageEpic);

export default eventsEpic;