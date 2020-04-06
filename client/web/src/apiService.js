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

  async getServers() {
    return this.callApi('{ servers { _id name host status users { uuid username } } }');
  }

  async getEvents(serverId) {
    return this.callApi('{ events(serverId:"' + serverId + '") { _id time type message player { uuid username } } }')
  }
}

export default ApiService;