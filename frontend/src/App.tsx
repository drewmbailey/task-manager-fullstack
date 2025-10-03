import React, { useEffect, useMemo, useState } from "react";
import {
  listTasks,
  createTask,
  updateTask,
  completeTask,
  deleteTask,
} from "./api";
import type { Task, Status } from "./types";
import { TaskFilter, TaskForm, TaskList } from "./components";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Status | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh(status?: Status) {
    setLoading(true);
    setError(null);
    try {
      const data = await listTasks(status);
      setTasks(data);
    } catch (e: any) {
      setError(e.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh(filter);
  }, [filter]);

  const filtered = useMemo(() => tasks, [tasks]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editing) {
        const upd = await updateTask(editing.id, {
          title,
          description,
          status: editing.status,
        });
        setTasks((prev) => prev.map((t) => (t.id === upd.id ? upd : t)));
        setEditing(null);
      } else {
        const created = await createTask({ title, description });
        setTasks((prev) => [created, ...prev]);
      }
      setTitle("");
      setDescription("");
    } catch (e: any) {
      setError(e.message ?? "Error");
    }
  }

  function onEdit(task: Task) {
    setEditing(task);
    setTitle(task.title);
    setDescription(task.description ?? "");
  }

  async function onComplete(id: number) {
    const upd = await completeTask(id);
    setTasks((prev) => prev.map((t) => (t.id === id ? upd : t)));
  }

  async function onDelete(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <TaskFilter
        filter={filter}
        onFilterChange={setFilter}
        onRefresh={() => refresh(filter)}
      />

      <TaskForm
        title={title}
        description={description}
        editing={editing}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSubmit={onSubmit}
        onCancel={() => {
          setEditing(null);
          setTitle("");
          setDescription("");
        }}
      />

      <TaskList
        tasks={filtered}
        loading={loading}
        error={error}
        onEdit={onEdit}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    </div>
  );
}

