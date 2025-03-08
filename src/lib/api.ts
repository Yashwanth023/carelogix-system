
import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to set auth token
const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// API endpoints with proper typing
const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) => 
      api.post('/auth/login', credentials),
    register: (userData: { name: string; email: string; password: string }) => 
      api.post('/auth/register', userData),
  },
  
  // Patient endpoints
  patients: {
    getAll: () => api.get('/patients'),
    getById: (id: number) => api.get(`/patients/${id}`),
    create: (patientData: any) => api.post('/patients', patientData),
    update: (id: number, patientData: any) => api.put(`/patients/${id}`, patientData),
    delete: (id: number) => api.delete(`/patients/${id}`),
  },
  
  // Doctor endpoints
  doctors: {
    getAll: () => api.get('/doctors'),
    getById: (id: number) => api.get(`/doctors/${id}`),
    create: (doctorData: any) => api.post('/doctors', doctorData),
    update: (id: number, doctorData: any) => api.put(`/doctors/${id}`, doctorData),
    delete: (id: number) => api.delete(`/doctors/${id}`),
  },
  
  // Patient-Doctor mapping endpoints
  mappings: {
    create: (mappingData: { patientId: number; doctorId: number }) => 
      api.post('/mappings', mappingData),
    getAll: () => api.get('/mappings'),
    getByPatientId: (patientId: number) => api.get(`/mappings/patient/${patientId}`),
    delete: (id: number) => api.delete(`/mappings/${id}`),
  },
  
  // Raw methods for custom endpoints
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  setAuthToken,
};

export default apiService;
