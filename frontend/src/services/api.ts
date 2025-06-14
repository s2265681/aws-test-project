import axios from 'axios';
import type { User } from '../types/user';
import type { Task, CreateTaskData, UpdateTaskData } from '../types/task';

const API_URL = 'http://18.141.179.222/api';
// const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

interface AuthResponse {
  data: any;
  token: string;
  user: User;
}

export const auth = {
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: { username: string; email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },
};

export const user = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data: { username?: string; email?: string }) =>
    api.patch('/users/me', data),
};

export const task = {
  getAll: () => api.get<Task[]>('/tasks'),
  getById: (id: number) => api.get<Task>(`/tasks/${id}`),
  create: (data: CreateTaskData) => api.post<Task>('/tasks', data),
  update: (id: number, data: UpdateTaskData) => api.put<Task>(`/tasks/${id}`, data),
  delete: (id: number) => api.delete(`/tasks/${id}`),
  toggleStatus: (id: number) => api.patch<Task>(`/tasks/${id}/toggle`),
};

export const health = {
  check: () => api.get('/health'),
};

export default api; 