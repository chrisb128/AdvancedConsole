import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  authenticated: false,
  loggingIn: false,
  loginError: null,
  userId: '',
  username: '',
  token: ''
};

export default createReducer(initialState, {
  AUTH_LOAD: (state, action) => ({...initialState}),
  AUTH_LOAD_SUCCESS: (state, action) => ({ ...state, loaded: true }),
  AUTH_LOGIN: (state, action) => ({ ...state, loggingIn: true, loginError: null }),
  AUTH_LOGIN_SUCCESS: (state, action) => ({ ...state, authenticated: !!action.userId, loggingIn: false, userId: action.userId, username: action.username, token: action.token }),
  AUTH_LOGIN_FAIL: (state, action) => ({ ...state, loggingIn: false, loginError: action.reason }),
  AUTH_LOGOUT: (state, action) => ({ ...state, authenticated: false, userId: '', userName: '', token: '' })
});

export const selectLoaded = state => state.auth.loaded;
export const selectAuthenticated = state => state.auth.authenticated;
export const selectLoggingIn = state => state.auth.loggingIn;
export const selectUserId = state => state.auth.userId;
export const selectUserName = state => state.auth.username;
export const selectLoginError = state => state.auth.authError;
export const selectToken = state => state.auth.token;