import { combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';

import AuthService from './authService'

import { login, loginSuccess, loginFail } from './actions';
import { selectToken } from './reducer';

const auth = new AuthService();

const loginEpic = (actions$, state$) => actions$.pipe(
    filter(action => action.type === login().type),
    mergeMap(async action => {
      const authInfo = await auth.login(action.username, action.password);
      if (authInfo.success) {
        return loginSuccess(action.username, authInfo.token);
      } else {
        return loginFail(action.username, authInfo.reason)
      }
    }),
);

export default combineEpics(loginEpic);