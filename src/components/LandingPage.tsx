"use client";
import React from "react";
import styled, { keyframes } from "styled-components";
import Login from "@/features/auth/Login";

export default function LandingPage() {
  return (
    <Container>
      <GlassCard>
        <Title>Welcome to taskOS</Title>
        <Subtitle>Secure, real-time task management — reimagined.</Subtitle>
        <LoginSection>
          <Prompt>Let’s get you started:</Prompt>
          <Login />
        </LoginSection>
      </GlassCard>
    </Container>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const GlassCard = styled.div`
  animation: ${fadeIn} 0.6s ease forwards;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  color: #f1f5f9;
  max-width: 450px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #cbd5e1;
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const LoginSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
`;

const Prompt = styled.p`
  margin-bottom: 0.75rem;
  color: #e2e8f0;
  font-weight: 500;
`;
