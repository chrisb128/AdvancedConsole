import { combineEpics } from 'redux-observable';
import { filter, map, mergeMap } from 'rxjs/operators';
import { fetchNextEventsPage, fetchNextEventsPageSuccess, fetchEvents, fetchEventsSuccess, setEventTypeFilter } from './actions';

import { selectPageSize, selectFilterTypes, selectList } from './reducer';
import { selectServerId } from '../reducer';

import ApiService from '../../../apiService';

const api = (state$) => new ApiService(state$.value.auth.token);

const fetchEventsEpic = (actions$, state$) => actions$.pipe(
    filter(action => action.type === fetchEvents().type),
    mergeMap(async (action) => {
        const serverId = selectServerId(state$.value);
        const pageSize = selectPageSize(state$.value);
        const filterTypes = selectFilterTypes(state$.value);
        const response = await api(state$).getEvents(serverId, pageSize, 0, filterTypes);
        return fetchEventsSuccess(response.data.events);
    }),
);

const fetchNextEventsPageEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === fetchNextEventsPage().type),
  mergeMap(async (action) => {
      const serverId = selectServerId(state$.value);
      const pageSize = selectPageSize(state$.value);
      const offset = selectList(state$.value).length;
      const filterTypes = selectFilterTypes(state$.value);
      const response = await api(state$).getEvents(serverId, pageSize, offset, filterTypes);
      return fetchNextEventsPageSuccess(response.data.events);
  }),
);

const setEventTypeFilterEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === setEventTypeFilter().type),
  map(() => fetchEvents())
)

const eventsEpic = combineEpics(fetchEventsEpic, fetchNextEventsPageEpic, setEventTypeFilterEpic);

export default eventsEpic;