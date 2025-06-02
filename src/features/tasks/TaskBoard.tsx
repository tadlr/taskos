"use client";

import React, { useState } from "react";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import styled from "styled-components";
import TaskBoardActions from "./TaskBoardActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fireConfetti } from "@/utils/confetti";
import { editTask } from "./taskSlice";

import Column from "./Column";

const columns = ["Pending", "In Progress", "Completed"];

export default function TaskBoard() {
  const dispatch = useAppDispatch();
  const { taskTree } = useAppSelector((state) => state.tasks);

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch(
        editTask({
          taskId: active.id as string,
          updates: { status: over.id as string },
        }),
      );
      if (over.id === "Completed") fireConfetti();
    }
  };

  return (
    <Container>
      <ActionsContainer>
        <SearchInput
          placeholder="Search tasks…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </ActionsContainer>
      <ColumnsWrapper>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {columns.map((status) => (
            <Column
              key={status}
              id={status}
              tasks={taskTree.filter(
                (t) =>
                  t.status === status &&
                  t.name.toLowerCase().includes(filter.toLowerCase()),
              )}
              onTaskClick={setSelectedTaskId}
            />
          ))}
        </DndContext>
      </ColumnsWrapper>

      <TaskBoardActions
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
      />
    </Container>
  );
}

const SearchInput = styled.input`
  margin: 1rem 0 2rem;
  width: 100%;
  flex: 0 0 auto;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #94a3b8;
  background: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
  outline: none;

  &::placeholder {
    color: #94a3b8;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  position: absolute;
  top: 0;
  left: 0;
  padding: 25px 40px;
  width: 100%;
`;

const ActionsContainer = styled.div`
  flex: 0 0 auto;
  margin-bottom: 1rem;
`;

const ColumnsWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  gap: 1rem;
  height: 100%;
  min-height: 0;
  overflow: hidden;
`;
