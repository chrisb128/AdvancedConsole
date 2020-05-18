import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';

import AuthService from './login/authService'
import ApiService from '../../apiService';

import { 
  login, loginSuccess, loginFail,
  updatePassword, updatePasswordSuccess
} from './actions';

const auth = new AuthService();

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

const api = (state$) => new ApiService(state$.value.auth.token);

const updatePasswordEpic = (actions$, state$) => actions$.pipe(
  filter(action => action.type === updatePassword().type),
  mergeMap(async action => {
    await api(state$).updateUserPassword(action.oldPassword, action.newPassword);
    return updatePasswordSuccess();
  })
);

export default combineEpics(loginEpic, updatePasswordEpic);