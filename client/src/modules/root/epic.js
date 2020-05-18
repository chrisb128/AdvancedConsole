import { combineEpics } from 'redux-observable';

import serverEpic from '../server/epic';
import authEpic from '../auth/epic';
import usersEpic from '../users/epic';

export default combineEpics(authEpic, serverEpic, usersEpic);