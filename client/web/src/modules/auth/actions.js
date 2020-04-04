export const login = (username, password) => ({ type: 'AUTH_LOGIN', username: username, password: password });
export const loginSuccess = (username, token) => ({ type: 'AUTH_LOGIN_SUCCESS', username: username, token: token });
export const loginFail = (username, reason) => ({ type: 'AUTH_LOGIN_FAIL', username: username, reason: reason });