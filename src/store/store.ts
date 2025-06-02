import LZString from "lz-string";

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/tasks/taskSlice";

const saveTasksMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  const result = next(action);

  if (action.type.startsWith("tasks/")) {
    const state = storeAPI.getState();
    const { tasks, auth } = state;

    if (auth.userId) {
      const json = JSON.stringify(tasks.taskTree);
      const compressed = LZString.compress(json);
      console.log("💾 Saving tasks:", compressed);
      localStorage.setItem(`tasks_${auth.userId}`, compressed);
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveTasksMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
