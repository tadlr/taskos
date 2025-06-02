"use client";

import React, { ReactNode } from "react";

import { useAuthRestore } from "@/features/auth/useAuthRestore";

export default function SessionRestore({ children }: { children: ReactNode }) {
  useAuthRestore();
  return <>{children}</>;
}
