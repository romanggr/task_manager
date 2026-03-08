import { Schema, model, Document } from 'mongoose';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.TODO },
  },
  { timestamps: true }
);

export const TaskModel = model<ITask>('Task', taskSchema);
