import React, { useState, useRef, useEffect } from "react";
import type { Status } from "../types";
import { MediumButton } from "./ButtonVariants";

interface TaskFilterProps {
  filter: Status | undefined;
  onFilterChange: (filter: Status | undefined) => void;
  onRefresh: () => void;
}

const filterOptions: Array<{ value: Status | undefined; label: string }> = [
  { value: undefined, label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "DONE", label: "Done" },
];

export default function TaskFilter({
  filter,
  onFilterChange,
  onRefresh,
}: TaskFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedLabel = filterOptions.find((opt) => opt.value === filter)?.label || "All";
  const selectedIndex = filterOptions.findIndex((opt) => opt.value === filter);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus the selected option or first option when opening
      const initialIndex = selectedIndex >= 0 ? selectedIndex : 0;
      setFocusedIndex(initialIndex);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        const initialIndex = selectedIndex >= 0 ? selectedIndex : 0;
        setFocusedIndex(initialIndex);
      } else if (e.key === "ArrowDown") {
        const currentIndex = focusedIndex >= 0 ? focusedIndex : selectedIndex >= 0 ? selectedIndex : 0;
        const nextIndex = (currentIndex + 1) % filterOptions.length;
        setFocusedIndex(nextIndex);
      } else if (e.key === "ArrowUp") {
        const currentIndex = focusedIndex >= 0 ? focusedIndex : selectedIndex >= 0 ? selectedIndex : 0;
        const prevIndex = currentIndex <= 0 ? filterOptions.length - 1 : currentIndex - 1;
        setFocusedIndex(prevIndex);
      }
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFilterChange(filterOptions[index].value);
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % filterOptions.length;
      setFocusedIndex(nextIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = index <= 0 ? filterOptions.length - 1 : index - 1;
      setFocusedIndex(prevIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setFocusedIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setFocusedIndex(filterOptions.length - 1);
    }
  };

  const handleOptionClick = (optionValue: Status | undefined) => {
    onFilterChange(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <section className="mb-4 flex gap-2 items-center">
      <label className="text-sm font-medium" id="filter-label">Filter:</label>
      <div className="relative" ref={dropdownRef}>
        <button
          ref={triggerRef}
          type="button"
          className="px-3 py-1 border border-black border-2 bg-white text-gray-900 text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer flex items-center gap-2 min-w-[100px] justify-between"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleTriggerKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="filter-label"
          aria-controls="filter-listbox"
        >
          <span>{selectedLabel}</span>
          <span className="text-xs" aria-hidden="true">▼</span>
        </button>
        {isOpen && (
          <div
            id="filter-listbox"
            role="listbox"
            aria-labelledby="filter-label"
            className="absolute top-full left-0 mt-1 border border-black border-2 bg-white z-50 min-w-[100px]"
          >
            {filterOptions.map((option, index) => {
              const isSelected = option.value === filter;
              return (
                <button
                  key={option.value ?? "all"}
                  ref={(el) => (optionRefs.current[index] = el)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`w-full px-3 py-1 text-left text-sm ${
                    isSelected
                      ? "bg-gray-400 text-black"
                      : ""
                  } hover:bg-gray-400 hover:text-black focus:bg-gray-400 focus:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-black`}
                  onClick={() => handleOptionClick(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <MediumButton onClick={onRefresh}>Refresh</MediumButton>
    </section>
  );
}

