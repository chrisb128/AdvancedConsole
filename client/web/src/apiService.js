export default class ApiService {
    async callApi(query) {
        return await 
            fetch('/api?', { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query }) 
            })
            .then(response => response.json());
    }

    async getServers() {
        return await this.callApi('{ servers { _id name host status } }');
    }

    async getEvents(serverId) {
        return await this.callApi('{ events(serverId:"' + serverId + '") { _id time type message } }')
    }
}