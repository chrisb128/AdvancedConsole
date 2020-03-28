export const fetchServers = () => ({ type: 'SERVER_FETCH_SERVERS' });
export const fetchServersSuccess = (list) => ({ type: 'SERVER_FETCH_SERVERS_SUCCESS', list: list });
