import React from "react";
import type { Task } from "../types";
import { MediumButton, DarkButton } from "./ButtonVariants";

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
        className="px-3 py-2 border border-black text-sm"
        placeholder="Task title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
      />
      <textarea
        className="px-3 py-2 border  border-black text-sm resize-none"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      <div className="flex gap-2">
        <MediumButton type="submit" className="px-4 py-2">
          {editing ? "Update Task" : "Add Task"}
        </MediumButton>
        {editing && (
          <DarkButton type="button" className="px-4 py-2" onClick={onCancel}>
            Cancel
          </DarkButton>
        )}
      </div>
    </form>
  );
}

