import React from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({
  task,
  onEdit,
  onComplete,
  onDelete,
}: TaskItemProps) {
  return (
    <li className="border border-gray-300 p-3 rounded-lg">
      <div className="flex justify-between">
        <strong>{task.title}</strong>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded">
          {task.status}
        </span>
      </div>
      {task.description && (
        <p className="mt-1 text-sm text-gray-600">{task.description}</p>
      )}
      <small className="text-xs text-gray-500">
        Created: {new Date(task.createdAt).toLocaleString()}
      </small>
      <div className="mt-2 flex gap-2">
        {task.status !== "DONE" && (
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            onClick={() => onComplete(task.id)}
          >
            Complete
          </button>
        )}
        <button
          className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

