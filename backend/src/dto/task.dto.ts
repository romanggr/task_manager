import { TaskStatus, ITask } from '../models/task.model';

// Input DTOs
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

// Output DTO — API contract, independent of the DB structure
export interface TaskResponseDto {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
}

export function toTaskDto(task: ITask): TaskResponseDto {
  return {
    _id: task._id.toString(),
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
  };
}
