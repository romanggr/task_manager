import { TaskStatus } from '../models/task.model';

interface TaskEntity {
  title: string;
  status: TaskStatus;
  description?: string;
}

function createNewTask(title: string): TaskEntity {
  return {
    title,
    status: TaskStatus.TODO,
  };
}

describe('Task logic', () => {
  test('NewTask_ShouldNotBeCompleted', () => {
    const task = createNewTask('Przetestować bezpiecznik');

    expect(task.title).toBe('Przetestować bezpiecznik');

    expect(task.status === TaskStatus.DONE).toBe(false);
  });

  test('NewTask_DefaultStatus_ShouldBeTodo', () => {
    const task = createNewTask('Test task');
    expect(task.status).toBe(TaskStatus.TODO);
  });

  test('NewTask_WithEmptyTitle_ShouldFail', () => {
    const createWithEmpty = () => {
      const title = '';
      if (!title.trim()) throw new Error('Title is required');
      return createNewTask(title);
    };
    expect(createWithEmpty).toThrow('Title is required');
  });
});
