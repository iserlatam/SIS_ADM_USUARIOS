import axios from 'axios';

const URI = 'https://api.seconalprueba.com/server/v1/';

const token = localStorage.getItem('initialToken');

export default axios.create({
  baseURL: URI,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
