import React, { ReactNode } from "react";

// Import custom component TaskRestore from specified path
import TaskRestore from "@/components/TaskRestore";

// Define the DashboardLayout functional component with props type definition
export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Return JSX which wraps children within the TaskRestore component
  return <TaskRestore>{children}</TaskRestore>;
}
