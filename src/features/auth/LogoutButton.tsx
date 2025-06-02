"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "./authSlice";
import React from "react";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_key");
    dispatch(logout());
    router.push("/");
  };

  return <StyledButton onClick={handleLogout}>Logout</StyledButton>;
}

const StyledButton = styled.button`
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    text-decoration: underline;
    // background: #dc2626;
  }
`;
