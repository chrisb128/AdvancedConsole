class ApiService {
  constructor(token) {
    this.token = token;
  }

  async callApi(query) {
    const response = await 
      fetch('/server/api/query?', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
        },
        body: JSON.stringify({ query }) 
      });
        
    return response.json();
  }

  async getMe() {
    return this.callApi('{ me { id username lastLoginDate } }');
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