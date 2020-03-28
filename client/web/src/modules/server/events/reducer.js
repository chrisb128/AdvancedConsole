import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

export default createReducer(initialState, {
    SERVER_EVENT_FETCH_EVENTS: (state, action) => ({...state, events: [] }),
    SERVER_EVENT_FETCH_EVENTS_SUCCESS: (state, action) => ({...state, list: action.events })
});


export const selectList = state => state.server.events.list;
