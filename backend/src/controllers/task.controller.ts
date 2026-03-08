import { Request, Response } from 'express';
import { taskService } from '../services/task.service';

export class TaskController {
  async getAll(req: Request, res: Response): Promise<void> {
    const tasks = await taskService.getAll();
    res.json(tasks);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const task = await taskService.getById(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  }

  async create(req: Request, res: Response): Promise<void> {
    const task = await taskService.create(req.body);
    res.status(201).json(task);
  }

  async update(req: Request, res: Response): Promise<void> {
    const task = await taskService.update(req.params.id, req.body);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const task = await taskService.delete(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(204).send();
  }
}

export const taskController = new TaskController();
