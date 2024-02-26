import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.weatherapi.com/v1', 
  
});

instance.interceptors.request.use(function (config) {
    config.params = {
      ...config.params,
      key: '3462f2c00ab143d4a5b122425242502',
      q: "Saint-Petersburg"
    };
    return config;
  });

export default instance;