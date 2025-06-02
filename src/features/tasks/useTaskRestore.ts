"use client";

import { useEffect } from "react";

import LZString from "lz-string";

import { useAppDispatch } from "@/store/hooks";

import { setTasks } from "./taskSlice";

export function useTaskRestore(userId: string | null) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId) return;

    const key = `tasks_${userId}`;
    const compressed = localStorage.getItem(key);

    if (compressed) {
      try {
        const json = LZString.decompress(compressed);

        if (json) {
          const tasks = JSON.parse(json);

          dispatch(setTasks(tasks));
        }
      } catch (err) {
        console.error("Failed to restore tasks:", err);
      }
    }
  }, [dispatch, userId]);
}
