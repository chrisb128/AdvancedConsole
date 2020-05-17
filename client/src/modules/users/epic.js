import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import ApiService from '../../apiService';

import { fetchCurrent, setCurrentUser, fetchList, fetchListSuccess } from './actions';

const api = (state$) => new ApiService(state$.value.login.token);

const fetchListEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === fetchList().type),
  mergeMap(async action => {
    const res = await api(state$).getUsers();
    return fetchListSuccess(res.data.users);
  })
);

const fetchCurrentEpic = (actions$, state$) => actions$.pipe(
    filter(action => action.type === fetchCurrent().type),
    mergeMap(async action => {
      const res = await api(state$).getMe();
      return setCurrentUser(res.data.me);
    })
);

export default combineEpics(fetchListEpic, fetchCurrentEpic);