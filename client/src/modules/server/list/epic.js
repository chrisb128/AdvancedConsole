import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';

import { fetchServersSuccess, fetchServers } from './actions';

import ApiService from '../../../apiService';

const api = (state$) => new ApiService(state$.value.auth.token);

const fetchServersEpic = (actions$, state$) => actions$.pipe(
    filter(action => action.type === fetchServers().type),
    mergeMap(async action => {
        const response = await api(state$).getServers();
        return fetchServersSuccess(response.data.servers);
    }),
);

const listEpic = combineEpics(fetchServersEpic);

export default listEpic;