"use client";

import React, { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { decryptData } from "@/utils/encryption";

import { finishRestore, setAuth } from "./authSlice";

export function useAuthRestore() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      const tokenEncrypted = localStorage.getItem("auth_token");
      const keyJwk = localStorage.getItem("auth_key");

      if (tokenEncrypted && keyJwk) {
        try {
          const key = await crypto.subtle.importKey(
            "jwk",
            JSON.parse(keyJwk),
            { name: "AES-GCM" },
            true,
            ["encrypt", "decrypt"],
          );
          const token = await decryptData(tokenEncrypted, key);

          dispatch(setAuth({ token, userId: "restored@session.com" }));
        } catch (err) {
          console.error("Failed to restore session:", err);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_key");
          dispatch(finishRestore());
        }
      } else {
        dispatch(finishRestore());
      }
    };

    restoreSession();
  }, [dispatch]);
}
