import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import ApiService from '../../apiService';

import { fetchCurrent, fetchCurrentSuccess } from './actions';

const api = (state$) => new ApiService(state$.value.login.token);

const fetchCurrentEpic = (actions$, state$) => actions$.pipe(
    filter(action => action.type === fetchCurrent().type),
    mergeMap(async action => {
      const myInfo = await api(state$).getMe();
      console.log(myInfo);
      return fetchCurrentSuccess(myInfo.data.me);
    })
);

export default combineEpics(fetchCurrentEpic);