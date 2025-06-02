"use client";
import React, { ReactNode } from "react";

// Import styled-components for styling
import styled from "styled-components";

// Footer component for displaying copyright and links
export default function Header({ children }: { children?: ReactNode }) {
  return (
    <Footer>
      © {new Date().getFullYear()} taskOS. All rights reserved.
      {" • "}
      <a href="#">Privacy</a>
      {" • "}
      <a href="#">Terms</a>
      {" • "}
      <a href="#">Support</a>
    </Footer>
  );
}

// Styled component for the footer container and links
const Footer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.875rem;
  color: #94a3b8;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  a {
    color: #94a3b8;
    margin: 0 0.25rem;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #f1f5f9;
    }
  }
`;
