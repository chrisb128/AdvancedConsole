import { combineReducers } from '@reduxjs/toolkit';
import serverReducer from '../server/reducer';

const rootReducer = combineReducers({
    server: serverReducer
});

export default rootReducer;