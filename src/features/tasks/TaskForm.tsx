"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTask } from "./taskSlice";

export default function TaskFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <>
      <OpenModalButton onClick={toggleModal}>+ New Task</OpenModalButton>
      {isOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={toggleModal} aria-label="Close modal">
              &times;
            </CloseButton>
            <TaskForm onClose={toggleModal} />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

function TaskForm({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const { taskTree } = useAppSelector((state) => state.tasks);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valid = await validateTaskNameBackend(name);
    if (!valid) {
      setError("Task name contains invalid characters.");
      return;
    }

    const duplicate = taskTree.some(
      (task) => task.name === name && task.status === status,
    );
    if (duplicate) {
      setError("Duplicate task name in the same status.");
      return;
    }

    dispatch(
      addTask({
        userId: "stored@example.com",
        name,
        status,
      }),
    );

    setName("");
    setStatus("Pending");
    onClose();
  };

  return (
    <FormContainer onSubmit={handleAddTask} noValidate>
      <Label htmlFor="task-name">Task Name</Label>
      <Input
        id="task-name"
        name="task-name"
        type="text"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-invalid={!!error}
        aria-describedby="task-error"
        required
      />

      <Label htmlFor="task-status">Status</Label>
      <Select
        id="task-status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </Select>

      <Button type="submit" aria-label="Add task">
        Add Task
      </Button>

      {error && (
        <Error id="task-error" role="alert">
          {error}
        </Error>
      )}
    </FormContainer>
  );
}

async function validateTaskNameBackend(name: string): Promise<boolean> {
  await new Promise((res) => setTimeout(res, 300));
  const regex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
  return regex.test(name);
}

// 🔥 Styled Components
const OpenModalButton = styled.button`
  background: #843687;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #2563eb;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  width: 100%;
  height: 100vh;
`;

const ModalContent = styled.div`
  background: #1e293b;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #f1f5f9;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #e2e8f0;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #94a3b8;
  background: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;

  &::placeholder {
    color: #94a3b8;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #94a3b8;
  background: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
`;

const Button = styled.button`
  background: #843687;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

const Error = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
`;
