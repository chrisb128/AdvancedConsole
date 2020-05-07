import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/reducer';
import serverReducer from '../server/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    server: serverReducer
});

export default rootReducer;