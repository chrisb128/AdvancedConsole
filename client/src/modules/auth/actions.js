export const load = (userId, username, token) => ({ type: 'AUTH_LOAD', userId, username, token });
export const loadSuccess = () => ({ type: 'AUTH_LOAD_SUCCESS' });
export const login = (username, password) => ({ type: 'AUTH_LOGIN', username, password });
export const loginSuccess = (userId, username, token) => ({ type: 'AUTH_LOGIN_SUCCESS', userId, username, token });
export const loginFail = (username, reason) => ({ type: 'AUTH_LOGIN_FAIL', username, reason });

export const logout = () => ({ type: 'AUTH_LOGOUT' });
export const logoutSuccess = () => ({ type: 'AUTH_LOGOUT_SUCCESS' });

export const updatePassword = (oldPassword, newPassword) => ({ type: 'AUTH_UPDATE_PASSWORD', oldPassword, newPassword });
export const updatePasswordSuccess = () => ({ type: 'AUTH_UPDATE_PASSWORD_SUCCESS' });