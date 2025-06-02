"use client";

import React, { useEffect } from "react";

import { setAuth } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { decryptData } from "@/utils/encryption";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadAuth = async () => {
      const tokenEncrypted = localStorage.getItem("auth_token");
      const keyJwk = localStorage.getItem("auth_key");
      if (tokenEncrypted && keyJwk) {
        const key = await crypto.subtle.importKey(
          "jwk",
          JSON.parse(keyJwk),
          { name: "AES-GCM" },
          true,
          ["encrypt", "decrypt"],
        );
        const token = await decryptData(tokenEncrypted, key);

        dispatch(setAuth({ token, userId: "stored@example.com" }));
      }
    };
    loadAuth();
  }, [dispatch]);

  return <>{children}</>;
}
