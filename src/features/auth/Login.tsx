"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import { useAppDispatch } from "@/store/hooks";
import { encryptData, generateKey } from "@/utils/encryption";
import { setAuth } from "./authSlice";

type ValidateResponse = {
  success: boolean;
  error?: string;
};

export default function Login() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [shake, setShake] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setStatus("Connecting to server…");

    await new Promise((res) =>
      setTimeout(res, Math.floor(Math.random() * 1300) + 200),
    );

    try {
      setStatus("Authenticating user…");
      const { data } = await axios.post(
        "https://reqres.in/api/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
          },
        },
      );

      setStatus("Generating secure connection key…");
      const key = await generateKey();

      setStatus("Verifying secure connection…");
      const exportedKey = JSON.stringify(
        await crypto.subtle.exportKey("jwk", key),
      );
      const { data: validateData } = await axios.post<ValidateResponse>(
        "/api/validate-key",
        { key: exportedKey, userId: email },
        { headers: { "Content-Type": "application/json" } },
      );

      if (!validateData.success) {
        throw new Error(`${validateData.error || "Key validation failed"}`);
      }

      setStatus("Encrypting session data…");
      const tokenEncrypted = await encryptData(data.token, key);

      localStorage.setItem("auth_token", tokenEncrypted);
      localStorage.setItem("auth_key", exportedKey);

      dispatch(setAuth({ token: data.token, userId: email }));
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
      setStatus(null);
    }
  };

  return (
    <>
      <FormContainer ref={formRef} className={shake ? "shake" : ""}>
        <FormTitle>Login</FormTitle>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        {status && (
          <StatusContainer>
            <LottiePlaceholder />
            <Status>{status}</Status>
          </StatusContainer>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>

      <Links>
        <a onClick={() => setShowSignUpModal(true)}>Sign Up</a>
        <span>•</span>
        <a onClick={() => setShowRecoverModal(true)}>Recover Password</a>
      </Links>

      {showSignUpModal && (
        <ModalOverlay onClick={() => setShowSignUpModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Sign Up</h2>
            <p>Ask your system manager to sign you up.</p>
            <CloseButton onClick={() => setShowSignUpModal(false)}>
              OK
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {showRecoverModal && (
        <ModalOverlay onClick={() => setShowRecoverModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Recover Password</h2>
            <p>Ask your system manager to recover your password.</p>
            <CloseButton onClick={() => setShowRecoverModal(false)}>
              OK
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;

  &.shake {
    animation: ${shakeAnimation} 0.5s;
  }
`;

const FormTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #f1f5f9;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
  outline: none;
  transition: background 0.2s;

  &:focus {
    background: rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #2563eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Links = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #94a3b8;
  display: flex;
  gap: 0.5rem;

  a {
    color: #fff;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #60a5fa;
    }
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LottiePlaceholder = styled.div`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
`;

const Status = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: #22c55e;
`;

const ErrorMessage = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: #ef4444;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background: #1e293b;
  border-radius: 8px;
  padding: 2rem;
  color: #f1f5f9;
  text-align: center;
  max-width: 300px;

  h2 {
    margin-top: 0;
  }

  p {
    margin: 1rem 0;
  }
`;

const CloseButton = styled.button`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
