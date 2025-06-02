"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

import { GripVertical, MoreVertical } from "lucide-react";
import styled from "styled-components";

import { useAppDispatch } from "@/store/hooks";
import { useDraggable } from "@dnd-kit/core";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteTask, editTask, toggleFavorite } from "./taskSlice";

export interface Task {
  id: string;
  name: string;
  active: boolean;
  favorite: boolean;
}

export default function DraggableTask({ task }: { task: Task }) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [showMenu, setShowMenu] = useState(false);

  const elementRef = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const handleSave = () => {
    if (newName.trim() && newName !== task.name) {
      dispatch(editTask({ taskId: task.id, updates: { name: newName } }));
    }
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  };

  useLayoutEffect(() => {
    if (isDragging && elementRef.current && !size) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
    if (!isDragging && size) {
      setSize(null);
    }
  }, [isDragging, size]);

  return (
    <TaskWrapper
      ref={(node) => {
        setNodeRef(node);
        elementRef.current = node;
      }}
      {...attributes}
      $isActive={task.active}
      $isDragging={!!transform}
      $size={size}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      <TaskName>
        {editing ? (
          <EditSection>
            <EditInput
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
            />
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </EditSection>
        ) : (
          task.name
        )}
      </TaskName>

      {!editing && (
        <Actions>
          <Star
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleFavorite(task.id));
            }}
            $favorite={task.favorite}
          >
            {task.favorite ? (
              <FontAwesomeIcon icon={faStarFilled} />
            ) : (
              <FontAwesomeIcon icon={faStar} />
            )}
          </Star>

          <MenuToggle
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical size={16} />
          </MenuToggle>

          {showMenu && (
            <DropdownMenu>
              <DropdownItem
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                  setShowMenu(false);
                }}
              >
                Edit
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                  setShowMenu(false);
                }}
                style={{ color: "#ef4444" }}
              >
                Delete
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFavorite(task.id));
                  setShowMenu(false);
                }}
              >
                {task.favorite ? "Unfavorite" : "Favorite"}
              </DropdownItem>
            </DropdownMenu>
          )}

          <DragHandle {...listeners}>
            <GripVertical size={16} />
          </DragHandle>
        </Actions>
      )}
    </TaskWrapper>
  );
}

const TaskWrapper = styled.div<{
  $isActive: boolean;
  $isDragging: boolean;
  $size: { width: number; height: number } | null;
}>`
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border: ${({ $isActive }) =>
    $isActive ? "2px solid #3b82f6" : "2px solid transparent"};
  width: ${({ $size }) => ($size ? `${$size.width}px` : "auto")};
  height: ${({ $size }) => ($size ? `${$size.height}px` : "auto")};
  transition: border 0.2s;

  &:hover {
    border: 2px solid #3b82f6;
  }
`;

const TaskName = styled.div`
  flex: 1;
`;

const EditSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 0.25rem;
  border-radius: 4px;
  border: 1px solid #94a3b8;
  outline: none;
`;

const SaveButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
`;

const Actions = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Star = styled.span<{ $favorite: boolean }>`
  font-size: 1rem;
  cursor: pointer;
  color: ${({ $favorite }) => ($favorite ? "#d89413" : "#94a3b8")};
  transition: color 0.2s;

  &:hover {
    color: #d89413;
  }
`;

const MenuToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #111827;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  color: #111827;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #f1f5f9;
  }
`;

const DragHandle = styled.div`
  cursor: grab;
  padding: 0 4px;
  color: #111827;
`;
