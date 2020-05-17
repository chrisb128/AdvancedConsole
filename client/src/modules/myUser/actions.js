export const fetchCurrent = () => ({ type: 'MYUSER_FETCH_CURRENT' });
export const fetchCurrentSuccess = (action) => ({ type: 'MYUSER_FETCH_CURRENT_SUCCESS', user: action });