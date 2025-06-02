"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import GlobalStyle from "../app/global";
import React from "react";
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>{children}</Provider>
    </>
  );
}
