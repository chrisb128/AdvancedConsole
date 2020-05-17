import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    user: {
        id: '',
        userName: '',
        lastLoginDate: ''
    }
};

export default createReducer(initialState, {
    USERS_FETCH_LIST_SUCCESS: (state, action) => ({...state, users: action.users}),
    USERS_FETCH_CURRENT: (state, action) => state,
    USERS_FETCH_CURRENT_SUCCESS: (state, action) => ({...state, user: { id: action.user.id, userName: action.user.username, lastLoginDate: action.user.lastLoginDate } })
});

export const selectUserList = state => state.users.users;
export const selectUserId = state => state.users.user.id;
export const selectUserName = state => state.users.user.userName;
export const selectLastLoginDate = state => state.users.user.lastLoginDate;