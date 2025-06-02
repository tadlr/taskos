import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskNode {
  id: string;
  name: string;
  status: string;
  favorite?: boolean;
  version: number;
  children?: TaskNode[];
}

export interface TasksState {
  taskTree: TaskNode[];
  lastUpdated: number;
}

function updateTaskNode(
  nodes: TaskNode[],
  taskId: string,
  updater: (task: TaskNode) => void,
): TaskNode[] {
  return nodes.map((node) => {
    if (node.id === taskId) {
      const updatedNode = { ...node };
      updater(updatedNode);
      return updatedNode;
    }
    if (node.children) {
      return {
        ...node,
        children: updateTaskNode(node.children, taskId, updater),
      };
    }
    return node;
  });
}

function deleteTaskNode(nodes: TaskNode[], taskId: string): TaskNode[] {
  return nodes
    .filter((node) => node.id !== taskId)
    .map((node) => ({
      ...node,
      children: node.children ? deleteTaskNode(node.children, taskId) : [],
    }));
}
export interface TaskNode {
  id: string;
  name: string;
  status: string;
  favorite?: boolean;
  version: number;
  children?: TaskNode[];
}

export interface TasksState {
  taskTree: TaskNode[];
  lastUpdated: number;
}

const initialState: TasksState = {
  taskTree: [],
  lastUpdated: Date.now(),
};

function generateUniqueId(userId: string, taskName: string): string {
  const datePart = Date.now().toString();
  const userPart = btoa(userId).slice(0, 5);
  const nameHash = btoa(unescape(encodeURIComponent(taskName)))
    .slice(0, 5)
    .replace(/[^a-zA-Z0-9]/g, "");
  return `${datePart}-${userPart}-${nameHash}`;
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        userId: string;
        name: string;
        status: string;
        parentId?: string;
      }>,
    ) => {
      const { userId, name, status, parentId } = action.payload;
      const id = generateUniqueId(userId, name);

      const newTask: TaskNode = {
        id,
        name,
        status,
        version: 1,
        children: [],
      };

      const checkDuplicate = (nodes: TaskNode[]): boolean =>
        nodes.some((t) => t.name === name && t.status === status);

      if (checkDuplicate(state.taskTree)) {
        console.warn("Duplicate task name!");
        return;
      }

      if (parentId) {
        state.taskTree = updateTaskNode(state.taskTree, parentId, (parent) => {
          parent.children = parent.children || [];
          parent.children.push(newTask);
        });
      } else {
        state.taskTree.push(newTask);
      }

      state.lastUpdated = Date.now();
    },

    editTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        updates: Partial<Omit<TaskNode, "id" | "children">>;
      }>,
    ) => {
      const { taskId, updates } = action.payload;
      state.taskTree = updateTaskNode(state.taskTree, taskId, (task) => {
        if (updates.version && updates.version !== task.version) {
          console.warn("Version conflict: optimistic locking failed!");
          return;
        }
        Object.assign(task, updates);
        task.version += 1;
      });
      state.lastUpdated = Date.now();
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.taskTree = deleteTaskNode(state.taskTree, action.payload);
      state.lastUpdated = Date.now();
    },

    setTasks: (state, action: PayloadAction<TaskNode[]>) => {
      state.taskTree = action.payload;
      state.lastUpdated = Date.now();
    },
    clearTasks: (state) => {
      state.taskTree = [];
      state.lastUpdated = Date.now();
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const toggleFavoriteRecursive = (nodes: TaskNode[]): TaskNode[] =>
        nodes.map((node) => {
          if (node.id === action.payload) {
            return { ...node, favorite: !node.favorite };
          }
          if (node.children) {
            return {
              ...node,
              children: toggleFavoriteRecursive(node.children),
            };
          }
          return node;
        });
      state.taskTree = toggleFavoriteRecursive(state.taskTree);
      state.lastUpdated = Date.now();
    },
  },
});

const taskCache: Record<string, TaskNode> = {};

export const getTaskById = (
  state: RootState,
  taskId: string,
): TaskNode | undefined => {
  if (taskCache[taskId]) return taskCache[taskId];
  const findRecursive = (nodes: TaskNode[]): TaskNode | undefined => {
    for (const node of nodes) {
      if (node.id === taskId) return (taskCache[taskId] = node);
      if (node.children) {
        const found = findRecursive(node.children);
        if (found) return (taskCache[taskId] = found);
      }
    }
  };
  return findRecursive(state.tasks.taskTree);
};

export const {
  addTask,
  editTask,
  deleteTask,
  setTasks,
  clearTasks,
  toggleFavorite,
} = taskSlice.actions;

export default taskSlice.reducer;
