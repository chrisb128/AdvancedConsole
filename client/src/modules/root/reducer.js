import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../login/reducer';
import serverReducer from '../server/reducer';
import usersReducer from '../users/reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    server: serverReducer,
    users: usersReducer,
});

export default rootReducer;