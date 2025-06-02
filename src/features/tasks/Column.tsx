"use client";

import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";
import DraggableTask from "./DraggableTask";
import React, { useRef } from "react";
export default function Column({
  id,
  tasks,
  onTaskClick,
}: {
  id: string;
  tasks: any[];
  onTaskClick: (id: string) => void;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Wrapper ref={setNodeRef}>
      <h3>{id}</h3>
      {tasks.map((task) => (
        <DraggableTask key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </Wrapper>
  );
}

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
    color: #111827; /* Optional, explicitly set heading color */
  }
`;
