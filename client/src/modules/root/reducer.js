import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../login/reducer';
import serverReducer from '../server/reducer';
import myUserReducer from '../myUser/reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    server: serverReducer,
    myUser: myUserReducer,
});

export default rootReducer;