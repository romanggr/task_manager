import { TaskModel } from '../models/task.model';
import { CreateTaskDto, UpdateTaskDto, TaskResponseDto, toTaskDto } from '../dto/task.dto';

export class TaskService {
  async getAll(): Promise<TaskResponseDto[]> {
    const tasks = await TaskModel.find().sort({ createdAt: -1 });
    return tasks.map(toTaskDto);
  }

  async getById(id: string): Promise<TaskResponseDto | null> {
    const task = await TaskModel.findById(id);
    return task ? toTaskDto(task) : null;
  }

  async create(dto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await TaskModel.create(dto);
    return toTaskDto(task);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<TaskResponseDto | null> {
    const task = await TaskModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true });
    return task ? toTaskDto(task) : null;
  }

  async delete(id: string): Promise<boolean> {
    const task = await TaskModel.findByIdAndDelete(id);
    return task !== null;
  }
}

export const taskService = new TaskService();
