import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  loggingIn: false,
  loginError: null,
  userName: '',
  token: ''
};

export default createReducer(initialState, {
  AUTH_LOGIN: (state, action) => ({ ...state, loggingIn: true, loginError: null }),
  AUTH_LOGIN_SUCCESS: (state, action) => ({ ...state, authenticated: true, loggingIn: false, userName: action.username, token: action.token }),
  AUTH_LOGIN_FAIL: (state, action) => ({ ...state, loggingIn: false, loginError: action.reason }),
  AUTH_LOGOUT: (state, action) => ({ ...state, authenticated: false, userName: '', token: '' })
});

export const selectAuthenticated = state => state.login.authenticated;
export const selectLoggingIn = state => state.login.loggingIn;
export const selectUserName = state => state.login.userName;
export const selectLoginError = state => state.login.loginError;
export const selectToken = state => state.login.token;