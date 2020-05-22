export default class AuthService {

  async post(url, query) {
    const response = await fetch(url, { 
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query) 
      });

    return response.json();
  }

  async load() {
    const response = await this.post('/server/api/auth/user');
    return response;
  }

  async login(userName, password) {
    const response = await this.post('/server/api/auth/login', { userName, password });
    return response;
  }

  async logout() {
    const response = await this.post('/server/api/auth/logout');
    return response;
  }
}