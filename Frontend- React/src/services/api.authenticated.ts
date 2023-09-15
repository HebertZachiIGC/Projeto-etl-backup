import axios from 'axios';

const accessToken = localStorage.getItem('@Auth:token');
const apiAuthenticated = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer ' + accessToken,
  },
});

export default apiAuthenticated;
