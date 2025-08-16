import axios from 'axios';

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASSWORD;
const token = btoa(`${username}:${password}`);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Basic ${token}`,
  },
});

export default api;