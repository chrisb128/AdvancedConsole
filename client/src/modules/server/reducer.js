import { combineReducers, createReducer } from '@reduxjs/toolkit';
import listReducer from './list/reducer';
import eventsReducer from './events/reducer';

const initialState = {
    serverId: null
};

export default combineReducers({
    server: createReducer(initialState, {
        SERVER_SET_SERVERID: (state, action) => ({ ...state, serverId: action.serverId})
    }),
    list: listReducer,
    events: eventsReducer,
});

export const selectServerId = (state) => state.server.server.serverId;
export const selectServerInfo = (serverId) => (state) => state.server.list.list.find(s => s._id === serverId);