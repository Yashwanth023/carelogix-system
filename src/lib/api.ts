
import axios from 'axios';

// Use a direct fallback URL instead of relying on process.env
const baseURL = import.meta.env.REACT_APP_API_URL || 'https://your-production-api.com/api';

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

// Define User interfaces
export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
}

export interface UserCredentials {
  email: string;
  password: string;
}

// API endpoints with proper typing
const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials: UserCredentials) => 
      api.post('/auth/login', credentials),
    register: (userData: UserRegistration) => 
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
  
  // Consultations endpoints
  consultations: {
    create: (consultationData: { patientId: number, doctorId: number, date: string, time: string, reason: string }) => 
      api.post('/consultations', consultationData),
    getAll: () => api.get('/consultations'),
    getByPatientId: (patientId: number) => api.get(`/consultations/patient/${patientId}`),
    getByDoctorId: (doctorId: number) => api.get(`/consultations/doctor/${doctorId}`),
    delete: (id: number) => api.delete(`/consultations/${id}`),
  },
  
  // Raw methods for custom endpoints
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  setAuthToken,
};

export default apiService;
