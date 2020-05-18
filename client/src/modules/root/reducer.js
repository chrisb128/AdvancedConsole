import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/reducer';
import serverReducer from '../server/reducer';
import usersReducer from '../users/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  server: serverReducer,
  users: usersReducer,
});

export default rootReducer;