// src/api.ts
import axios from 'axios';

// Obtém a URL da API e a API Key das variáveis de ambiente
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const apiKey = import.meta.env.VITE_API_KEY;

console.log('API URL:', apiUrl); // Para debug em desenvolvimento

// Cria instância do axios com configuração base
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 segundos de timeout
});

// Interceptor para adicionar a API key em todas as requisições
api.interceptors.request.use(
  config => {
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de respostas e erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Erro da API:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    } else if (error.request) {
      console.error('Erro de rede:', error.request);
    } else {
      console.error('Erro:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;