import axios from 'axios';

export const bff = axios.create({
  mode: 'cors',
  baseURL: process.env.REACT_APP_API_URL,
});

bff.interceptors.response.use((response) => response.data);
