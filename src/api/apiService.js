import axios from 'axios';

// ATENÇÃO: Configure a URL base da sua API .NET aqui.
// Veja a nota abaixo para saber qual IP usar.
// Exemplo para Emulador Android: 'http://10.0.2.2:5012/api'
const API_BASE_URL = 'http://10.0.2.2:5012/api';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Funções para Motos ---
export const getMotos = (pageNumber = 1, pageSize = 10) =>
  apiService.get(`/motos?pageNumber=${pageNumber}&pageSize=${pageSize}`);

export const getMotoById = (id) => apiService.get(`/motos/${id}`);

export const createMoto = (motoData) => apiService.post('/motos', motoData);

export const updateMoto = (id, motoData) => apiService.put(`/motos/${id}`, motoData);

export const deleteMoto = (id) => apiService.delete(`/motos/${id}`);


// --- Funções para Patios ---
export const getPatios = (pageNumber = 1, pageSize = 10) =>
  apiService.get(`/patios?pageNumber=${pageNumber}&pageSize=${pageSize}`);

export const getPatioById = (id) => apiService.get(`/patios/${id}`);

export const createPatio = (patioData) => apiService.post('/patios', patioData);

export const updatePatio = (id, patioData) => apiService.put(`/patios/${id}`, patioData);

export const deletePatio = (id) => apiService.delete(`/patios/${id}`);

// Adicione aqui outras funções de API se necessário (ex: Status)

export default apiService;