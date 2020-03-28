import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    list: []
};

export default createReducer(initialState, {
    SERVER_FETCH_SERVERS: (state, action) => ({...state, loading: true}),
    SERVER_FETCH_SERVERS_SUCCESS: (state, action) => ({...state, loading: false, list: action.list})
});

export const selectLoading = state => state.server.list.loading;
export const selectList = state => state.server.list.list;
