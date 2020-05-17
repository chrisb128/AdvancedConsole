import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import ApiService from '../../apiService';

import { 
  fetchCurrent, setCurrentUser, fetchList, fetchListSuccess, 
  addUser, addUserSuccess, updateUserPassword, updateUserPasswordSuccess 
} from './actions';

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

const addUserEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === addUser().type),
  mergeMap(async action => {
    await api(state$).addUser(action.user);
    return addUserSuccess();
  })
);

const updateUserPasswordEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === updateUserPassword().type),
  mergeMap(async action => {
    await api(state$).updateUserPassword(action.oldPassword, action.newPassword);
    return updateUserPasswordSuccess();
  })
);

export default combineEpics(fetchListEpic, fetchCurrentEpic, addUserEpic, updateUserPasswordEpic);