"use client";

// Import React and hooks
import React, { useEffect } from "react";

// Import Next.js router and styled-components
import { useRouter } from "next/navigation";
import styled from "styled-components";

// Import custom components for the dashboard layout
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LogoutButton from "@/features/auth/LogoutButton";
import TaskBoard from "@/features/tasks/TaskBoard";
import TaskForm from "@/features/tasks/TaskForm";
import { useAppSelector } from "@/store/hooks";

// Dashboard page component
export default function Dashboard() {
  // Get authentication state from Redux store
  const { token, restoring } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Redirect to home page if not authenticated and not restoring
  useEffect(() => {
    if (!restoring && !token) {
      router.push("/");
    }
  }, [restoring, token, router]);

  // Show loading spinner while restoring authentication state
  if (restoring) {
    return (
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    );
  }

  // Render dashboard layout with header, task board, and footer
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

// Main container for the dashboard page
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

// Container for header buttons (logout and add task)
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`;

// Container for the task board section
const TaskBoardContainer = styled.div`
  width: 100%;
  flex: 1;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

// Centered container for loading spinner
const CenteredContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1f5f9;
`;

// Spinner component for loading state
const Spinner = styled.div.attrs({
  ...({ "data-testid": "spinner" } as Record<string, any>),
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
