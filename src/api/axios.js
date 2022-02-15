import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(res => {
  console.log(res);
  return res;
});

instance.interceptors.response.use(res => {
  return res.data;
});

export default instance;