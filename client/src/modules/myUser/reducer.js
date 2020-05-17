import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    userName: '',
    lastLoginDate: ''
};

export default createReducer(initialState, {
    MYUSER_FETCH_CURRENT: (state, action) => state,
    MYUSER_FETCH_CURRENT_SUCCESS: (state, action) => ({...state, id: action.user.id, userName: action.user.username, lastLoginDate: action.user.lastLoginDate})
});

export const selectUserId = state => state.myUser.id;
export const selectUserName = state => state.myUser.userName;
export const selectLastLoginDate = state => state.myUser.lastLoginDate;