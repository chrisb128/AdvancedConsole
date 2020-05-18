import { combineEpics } from 'redux-observable';
import { push } from 'connected-react-router';
import { filter, mergeMap } from 'rxjs/operators';
import ApiService from '../../apiService';

import { 
  fetchCurrent, setCurrentUser, fetchList, fetchListSuccess, 
  addUser, addUserSuccess 
} from './actions';

const api = (state$) => new ApiService(state$.value.auth.token);

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

const addUserEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === addUser().type),
  mergeMap(async action => {
    const { addUser } = await api(state$).addUser(action.user);
    return addUserSuccess(addUser);
  })
);

const addUserSuccessEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === addUserSuccess().type),
  mergeMap(action => {
    push('/client/users');

    return [
      setCurrentUser(action.user),
      fetchList()
    ];
  })
);


export default combineEpics(fetchListEpic, fetchCurrentEpic, addUserEpic, addUserSuccessEpic);