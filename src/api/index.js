const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://auth-app-dev-challenge.herokuapp.com/api',
});

instance.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem('token'));
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
