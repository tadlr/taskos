"use client";

import React from "react";

import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { clearTasks } from "./taskSlice";

export default function TaskBoardActions({}) {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.auth);

  const handleDeleteAllTasks = () => {
    if (confirm("Are you sure you want to delete ALL tasks?")) {
      dispatch(clearTasks());
      if (userId) {
        localStorage.removeItem(`tasks_${userId}`);
      }
    }
  };

  return (
    <ActionsContainer>
      <DeleteAllButton onClick={handleDeleteAllTasks}>
        <FontAwesomeIcon icon={faTrash} />
        <span className="ps-2 hover:underline">Delete All Tasks</span>
      </DeleteAllButton>
    </ActionsContainer>
  );
}

const ActionsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const DeleteAllButton = styled.button`
  margin-top: 0.5rem;

  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
`;
