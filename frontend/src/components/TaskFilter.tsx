import React from "react";
import type { Status } from "../types";

interface TaskFilterProps {
  filter: Status | undefined;
  onFilterChange: (filter: Status | undefined) => void;
  onRefresh: () => void;
}

export default function TaskFilter({
  filter,
  onFilterChange,
  onRefresh,
}: TaskFilterProps) {
  return (
    <section className="mb-4 flex gap-2 items-center">
      <label className="text-sm font-medium">Filter:</label>
      <select
        className="px-3 py-1 border border-gray-300 rounded text-sm"
        value={filter ?? ""}
        onChange={(e) => onFilterChange((e.target.value || undefined) as any)}
      >
        <option value="">All</option>
        <option value="OPEN">Open</option>
        {/* <option value="IN_PROGRESS">In progress</option> */}
        <option value="DONE">Done</option>
      </select>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        onClick={onRefresh}
      >
        Refresh
      </button>
    </section>
  );
}

