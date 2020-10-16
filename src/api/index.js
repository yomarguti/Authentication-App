const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001/api',
});

const token = JSON.parse(localStorage.getItem('token'));
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default instance;
