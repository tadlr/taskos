"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoutButton from "@/features/auth/LogoutButton";
import TaskBoard from "@/features/tasks/TaskBoard";
import { useAppSelector } from "@/store/hooks";
import TaskForm from "@/features/tasks/TaskForm";

export default function Dashboard() {
  const { token, restoring } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!restoring && !token) {
      router.push("/");
    }
  }, [restoring, token, router]);

  if (restoring) {
    return (
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    );
  }

  return (
    <>
      <Header>
        <ButtonContainer>
          <LogoutButton />
          <TaskForm />
        </ButtonContainer>
      </Header>
      <PageContainer>
        <TaskBoardContainer>
          <TaskBoard />
        </TaskBoardContainer>
        <Footer />
      </PageContainer>
    </>
  );
}

// Styled Components
const PageContainer = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  padding-top: 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-left: 1rem; /* Align with header */
`;

const TaskBoardContainer = styled.div`
  width: 100%;
  flex: 1; /* 🔥 Take up remaining space */
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  /* 🔥 Responsive paddings */
  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const CenteredContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1f5f9;
`;

const Spinner = styled.div`
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
