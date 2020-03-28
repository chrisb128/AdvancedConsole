import { combineEpics } from 'redux-observable';
import serverEpic from '../server/epic';

export default combineEpics(serverEpic);