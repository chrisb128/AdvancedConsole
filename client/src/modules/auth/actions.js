export const login = (username, password) => ({ type: 'AUTH_LOGIN', username: username, password: password });
export const loginSuccess = (userId, username, token) => ({ type: 'AUTH_LOGIN_SUCCESS', userId: userId, username: username, token: token });
export const loginFail = (username, reason) => ({ type: 'AUTH_LOGIN_FAIL', username: username, reason: reason });

export const logout = () => ({ type: 'AUTH_LOGOUT' });
export const logoutSuccess = () => ({ type: 'AUTH_LOGOUT_SUCCESS' });

export const updatePassword = (oldPassword, newPassword) => ({ type: 'AUTH_UPDATE_PASSWORD', oldPassword, newPassword });
export const updatePasswordSuccess = () => ({ type: 'AUTH_UPDATE_PASSWORD_SUCCESS' });