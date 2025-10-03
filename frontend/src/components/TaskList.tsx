import React from "react";
import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onEdit: (task: Task) => void;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({
  tasks,
  loading,
  error,
  onEdit,
  onComplete,
  onDelete,
}: TaskListProps) {
  if (error) {
    return <p className="text-red-500 text-sm mb-4">{error}</p>;
  }

  if (loading) {
    return <p className="text-gray-600 text-sm">Loading…</p>;
  }

  return (
    <ul className="list-none p-0 grid gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

