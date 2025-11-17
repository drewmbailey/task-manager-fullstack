import React from "react";
import type { Task } from "../types";
import { LightButton, MediumButton, DarkButton } from "./ButtonVariants";

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
    <li className="border-gray-400 border-2 p-3">
      <div className="flex justify-between">
        <strong>{task.title}</strong>
        <span 
          className={`text-xs px-2 py-1 ${
            task.status === "OPEN" ? "bg-gray-300" : "bg-gray-500 text-white"
          }`}
        >
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
          <LightButton
            className="px-2 py-1 text-xs"
            onClick={() => onComplete(task.id)}
          >
            Complete
          </LightButton>
        )}
        <MediumButton
          className="px-2 py-1 text-xs"
          onClick={() => onEdit(task)}
        >
          Edit
        </MediumButton>
        <DarkButton
          className="px-2 py-1 text-xs"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </DarkButton>
      </div>
    </li>
  );
}

