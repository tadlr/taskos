"use client";
import styled from "styled-components";
import React, { ReactNode } from "react";

export default function Header({ children }: { children?: ReactNode }) {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo src="/logo-w.svg" alt="taskOS Logo" />
        {children}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: 40px;
`;
