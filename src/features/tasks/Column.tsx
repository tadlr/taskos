"use client";

// Import React for component creation
import React from "react";

// Import styled-components for styling
import styled from "styled-components";

// Import useDroppable hook from dnd-kit for drag-and-drop functionality
import { useDroppable } from "@dnd-kit/core";

// Import DraggableTask component to render individual draggable tasks
import DraggableTask from "./DraggableTask";

// Column component represents a single task column (e.g., Pending, In Progress, Completed)
export default function Column({
  id,
  tasks,
  onTaskClick,
}: {
  id: string; // Column identifier (status)
  tasks: any[]; // Array of tasks for this column
  onTaskClick: (id: string) => void; // Handler for clicking a task
}) {
  // Set up droppable area for drag-and-drop using dnd-kit
  const { setNodeRef } = useDroppable({ id });

  return (
    // Wrapper is the styled container for the column
    <Wrapper ref={setNodeRef}>
      {/* Column title */}
      <h3>{id}</h3>
      {/* Render each task as a draggable item */}
      {tasks.map((task) => (
        <DraggableTask key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </Wrapper>
  );
}

// Styled component for the column container
const Wrapper = styled.div`
  flex: 1;
  background: #e0e0e0;
  padding: 16px;
  min-height: 80%;
  border-radius: 8px;
  color: #111827;

  h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    color: #111827;
  }
`;
