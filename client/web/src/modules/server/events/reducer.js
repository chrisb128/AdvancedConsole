import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    loading: false,
    pageSize: 50
};

export default createReducer(initialState, {
    SERVER_EVENT_FETCH_EVENTS: (state, action) => ({...state, list: [], loading: true }),
    SERVER_EVENT_FETCH_EVENTS_SUCCESS: (state, action) => ({...state, list: action.events, loading: false }),
    SERVER_EVENT_FETCH_NEXT_EVENTS_PAGE: (state, action) => ({ ...state, loading: true }),
    SERVER_EVENT_FETCH_NEXT_EVENTS_PAGE_SUCCESS: (state, action) => ({ ...state, list: [...state.list, ...action.events], loading: false })
});

export const selectLoading = state => state.server.events.loading;
export const selectList = state => state.server.events.list;
