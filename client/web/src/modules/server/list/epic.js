import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';

import { fetchServersSuccess } from './actions';

import ApiService from '../../../apiService';

const api = new ApiService();

const fetchServersEpic = actions$ => actions$.pipe(
    filter(action => action.type === 'SERVER_FETCH_SERVERS'),
    mergeMap(async action => {
        const response = await api.getServers();
        return fetchServersSuccess(response.data.servers);
    }),
);

const listEpic = combineEpics(fetchServersEpic);

export default listEpic;