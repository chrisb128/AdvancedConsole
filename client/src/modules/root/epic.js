import { combineEpics } from 'redux-observable';

import serverEpic from '../server/epic';
import loginEpic from '../login/epic';
import usersEpic from '../users/epic';

export default combineEpics(loginEpic, serverEpic, usersEpic);