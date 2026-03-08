import api from './api';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';

export const taskService = {
  getAll: () => api.get<Task[]>('/api/tasks').then(r => r.data),
  getById: (id: string) => api.get<Task>(`/api/tasks/${id}`).then(r => r.data),
  create: (dto: CreateTaskDto) => api.post<Task>('/api/tasks', dto).then(r => r.data),
  update: (id: string, dto: UpdateTaskDto) => api.put<Task>(`/api/tasks/${id}`, dto).then(r => r.data),
  delete: (id: string) => api.delete(`/api/tasks/${id}`),
};
