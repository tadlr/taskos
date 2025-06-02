"use client";

import React, { ReactNode, useEffect, useState } from "react";

import styled from "styled-components";

import { useTaskRestore } from "@/features/tasks/useTaskRestore";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

export default function TaskRestore({ children }: { children: ReactNode }) {
  const { userId, restoring } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const [delayed, setDelayed] = useState(true);

  console.log(userId, restoring, "🚀 TaskRestore");
  useTaskRestore(userId);

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  if (restoring || delayed) {
    return (
      <CenteredContainer>
        <Spinner />
        <Message>Decrypting secure data…</Message>
      </CenteredContainer>
    );
  }

  return <>{children}</>;
}

const CenteredContainer = styled.div`
  background: linear-gradient(135deg, #0f172a, #1e293b);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f1f5f9;
  gap: 1rem;
  padding: 2rem;
`;

const Spinner = styled.div.attrs({
  ...({ "data-testid": "spinner" } as Record<string, string>),
})`
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-left-color: #3b82f6;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.span`
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
`;
