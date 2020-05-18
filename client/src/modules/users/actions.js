export const fetchCurrent = () => ({ type: 'USERS_FETCH_CURRENT' });
export const fetchList = () => ({ type: 'USERS_FETCH_LIST' });
export const fetchListSuccess = (users) => ({ type: 'USERS_FETCH_LIST_SUCCESS', users })
export const setCurrentUser = (user) => ({ type: 'USERS_FETCH_CURRENT_SUCCESS', user });
export const addUser = (user) => ({ type: 'USERS_ADD', user });
export const addUserSuccess = (user) => ({ type: 'USERS_ADD_SUCCESS', user });