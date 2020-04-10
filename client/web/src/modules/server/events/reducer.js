import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    loading: false,
    pageSize: 50,
    filter: {
      types: [1, 2, 3, 4, 5, 6, 7]
    }
};

const getUpdatedFilters = (state, key, selected) => {
  
  const eventTypeIndex = state.filter.types.indexOf(key);
  if (selected && eventTypeIndex < 0) {
    return [...state.filter.types, key];
  } else if (!selected && eventTypeIndex >= 0) {
    return [...state.filter.types.slice(0, eventTypeIndex),
      ...state.filter.types.slice(eventTypeIndex + 1, state.filter.types.length)]
  }

  return state.filter.types;
}

export default createReducer(initialState, {
    SERVER_EVENT_FETCH_EVENTS: (state, action) => ({...state, list: [], loading: true }),
    SERVER_EVENT_FETCH_EVENTS_SUCCESS: (state, action) => ({...state, list: action.events, loading: false }),
    SERVER_EVENT_FETCH_NEXT_EVENTS_PAGE: (state, action) => ({ ...state, loading: true }),
    SERVER_EVENT_FETCH_NEXT_EVENTS_PAGE_SUCCESS: (state, action) => ({ ...state, list: [...state.list, ...action.events], loading: false }),
    SERVER_EVENT_SET_EVENT_TYPE_FILTER: (state, action) => ({ ...state, filter: { types: getUpdatedFilters(state, action.eventType, action.selected) } })
});

export const selectLoading = state => state.server.events.loading;
export const selectList = state => state.server.events.list;
export const selectPageSize = state => state.server.events.pageSize;
export const selectFilterTypes = state => state.server.events.filter.types;