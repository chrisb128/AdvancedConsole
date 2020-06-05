//import { Cookies } from 'react-cookie';

class ApiService {
  constructor(token) {
    this.token = token;
  }

  async callApi(query) {
      
    const response = await 
      fetch('/server/api/query?', { 
        method: 'POST', 
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        },
        body: JSON.stringify({ query }) 
      });

    return response.json();
  }

  async getUsers() {
    return this.callApi('{ users { id username lastLoginDate } }');
  }

  async getMe() {
    return this.callApi('{ me { id username lastLoginDate } }');
  }

  async addUser(user) {
    return this.callApi(`mutation { addUser(username:"${user.username}" password:"${user.password}") { id username lastLoginDate } }`);
  }

  async deleteUser(userId) {
    return this.callApi(`mutation { deleteUser(userId:"${userId}") { id }}`)
  }

  async updateUserPassword(oldPassword, newPassword) {
    return this.callApi(`mutation { updateUserPassword(oldPassword:"${oldPassword}" newPassword:"${newPassword}") { id username lastLoginDate } }`)
  }

  async getServers() {
    return this.callApi('{ servers { id name host status lastReportTime users { uuid username } } }');
  }

  async getEvents(serverId, limit, offset, types) {
    const eventsQuery = 
      '{'
      + 'events('
        + 'serverId:"' + serverId + '" ' 
        + 'limit:' + limit.toString() + ' '
        + 'offset:' + offset.toString() + ' ' 
        + 'filter: { types: [' + types.map(t => t.toString()).join(',') + '] } '
      + ')' 
      + '{ id time type message player { uuid username } }'
      +'}';
    return this.callApi(eventsQuery);
  }
}

export default ApiService;