import { combineEpics } from 'redux-observable';

import serverEpic from '../server/epic';
import loginEpic from '../login/epic';

export default combineEpics(loginEpic, serverEpic);