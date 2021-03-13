import axios from 'axios';

// Consumindo a API com a URL base definida
const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
