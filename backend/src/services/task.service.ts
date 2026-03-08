import { TaskModel, ITask } from '../models/task.model';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';

export class TaskService {
  async getAll(): Promise<ITask[]> {
    return TaskModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<ITask | null> {
    return TaskModel.findById(id);
  }

  async create(dto: CreateTaskDto): Promise<ITask> {
    return TaskModel.create(dto);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<ITask | null> {
    return TaskModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<ITask | null> {
    return TaskModel.findByIdAndDelete(id);
  }
}

export const taskService = new TaskService();
