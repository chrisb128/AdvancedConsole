export default class AuthService {

  async post(url, query) {
    const response = await fetch(url, { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query) 
      });

    return response.json();
  }

  async login(userName, password) {
    const response = await this.post('/api/auth/login', { userName, password });
    console.log('auth:login', response);
    return response;
  }
}