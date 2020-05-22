import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { empty } from 'rxjs';

import AuthService from './login/authService'
import ApiService from '../../apiService';

import { 
  load, loadSuccess,
  login, loginSuccess, loginFail,
  logout, logoutSuccess,
  updatePassword, updatePasswordSuccess
} from './actions';

import history from '../../app/history';

const auth = new AuthService();

const loadEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === load().type),
  mergeMap(async action => await auth.load()),
  mergeMap(action => {
    if (action.success) {
      return [
        loginSuccess(action.userId, action.username, action.token),
        loadSuccess()
      ];
    } else {
      return [loadSuccess()];
    }
  })
);

const loginEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === login().type),
  mergeMap(async action => {
    const authInfo = await auth.login(action.username, action.password);
    if (authInfo.success) {
      return loginSuccess(authInfo.userId, authInfo.username, authInfo.token);
    } else {
      return loginFail(action.username, authInfo.reason)
    }
  }),
);

const logoutEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === logout().type),
  mergeMap(async action => {
    await auth.logout();
    return logoutSuccess();
  })
);

const api = (state$) => new ApiService(state$.value.auth.token);

const updatePasswordEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === updatePassword().type),
  mergeMap(async action => {
    await api(state$).updateUserPassword(action.oldPassword, action.newPassword);
    return updatePasswordSuccess();
  })
);

const updatePasswordSuccessEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === updatePasswordSuccess().type),
  mergeMap(() => {
    history.push('/client/users');
    return empty();
  })
);


export default combineEpics(loadEpic, loginEpic, logoutEpic, updatePasswordEpic, updatePasswordSuccessEpic);