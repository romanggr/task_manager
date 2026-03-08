import { TaskStatus } from '../models/task.model';

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
