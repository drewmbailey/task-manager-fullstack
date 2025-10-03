import React from "react";
import type { Task } from "../types";

interface TaskFormProps {
  title: string;
  description: string;
  editing: Task | null;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function TaskForm({
  title,
  description,
  editing,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="grid gap-2 mb-6">
      <input
        className="px-3 py-2 border border-gray-300 rounded text-sm"
        placeholder="Task title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
      />
      <textarea
        className="px-3 py-2 border border-gray-300 rounded text-sm resize-none"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {editing ? "Update Task" : "Add Task"}
        </button>
        {editing && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

