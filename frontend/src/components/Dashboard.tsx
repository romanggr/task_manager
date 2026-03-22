import { useEffect, useState } from 'react';
import type { Task, CreateTaskDto, TaskStatus } from '../types/task';
import { taskService } from '../services/task.service';
import './Dashboard.css';

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

const STATUS_COLUMNS: TaskStatus[] = ['todo', 'in_progress', 'done'];


export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editForm, setEditForm] = useState<CreateTaskDto>(EMPTY_FORM);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      setSubmitting(true);
      await taskService.create({ title: newTitle.trim(), description: '', status: 'todo' });
      setNewTitle('');
      await fetchTasks();
    } catch {
      setError('Failed to create task');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  const openEdit = (task: Task) => {
    setEditTask(task);
    setEditForm({ title: task.title, description: task.description ?? '', status: task.status });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTask || !editForm.title.trim()) return;
    try {
      setSubmitting(true);
      const updated = await taskService.update(editTask._id, editForm);
      setTasks(prev => prev.map(t => t._id === updated._id ? updated : t));
      setEditTask(null);
    } catch {
      setError('Failed to update task');
    } finally {
      setSubmitting(false);
    }
  };

  const tasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status);

  return (
    <div className="dashboard">
      <header className="dash-header">
        <h1 className="dash-title">Task Manager</h1>
        <form className="quick-add" onSubmit={handleQuickAdd}>
          <input
            className="quick-add__input"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Wpisz nowe zadanie..."
            disabled={submitting}
          />
          <button className="btn-primary" type="submit" disabled={submitting || !newTitle.trim()}>
            Dodaj Zadanie
          </button>
        </form>
      </header>

      {error && <div className="error-bar">{error} <button onClick={() => setError(null)}>✕</button></div>}

      {loading ? (
        <div className="loading">Loading tasks…</div>
      ) : (
        <div className="board">
          {STATUS_COLUMNS.map(status => (
            <div key={status} className={`column column--${status}`}>
              <div className="col-header">
                <span className={`col-badge col-badge--${status}`} />
                <h2>{STATUS_LABELS[status]}</h2>
                <span className="col-count">{tasksByStatus(status).length}</span>
              </div>

              <div className="task-list">
                {tasksByStatus(status).length === 0 && (
                  <p className="empty">No tasks here</p>
                )}
                {tasksByStatus(status).map(task => (
                  <div key={task._id} className="task-card">
                    <p className="task-title">{task.title}</p>
                    {task.description && <p className="task-desc">{task.description}</p>}
                    <p className="task-date">{new Date(task.createdAt).toLocaleDateString()}</p>
                    <div className="task-actions">
                      <button className="btn-edit" onClick={() => openEdit(task)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(task._id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editTask && (
        <div className="modal-overlay" onClick={() => setEditTask(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Edit Task</h2>
            <form onSubmit={handleUpdate}>
              <label>Title *</label>
              <input
                value={editForm.title}
                onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                required
              />
              <label>Description</label>
              <textarea
                value={editForm.description}
                onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                rows={3}
              />
              <label>Status</label>
              <select
                value={editForm.status}
                onChange={e => setEditForm(f => ({ ...f, status: e.target.value as TaskStatus }))}
              >
                {STATUS_COLUMNS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditTask(null)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
