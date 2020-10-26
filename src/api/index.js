import axios from 'axios';
import { config } from '../constants';

const instance = axios.create({
  baseURL: `${config.url.API_URL}/api`,
});

instance.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem('token'));
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
