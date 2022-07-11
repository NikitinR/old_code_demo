import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  responseType: 'json',
});

instance.defaults.headers.post['Content-Type'] =
  'application/json; charset=utf-8';

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');

  config.headers.Authorization = '';
  delete config.headers.Authorization;

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

export default instance;
