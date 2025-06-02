import React, { ReactNode } from "react";

import TaskRestore from "@/components/TaskRestore";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <TaskRestore>{children}</TaskRestore>;
}
