import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: string | null;
  restoring: boolean;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  restoring: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; userId: string }>) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.restoring = false;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.restoring = false;
    },
    finishRestore(state) {
      state.restoring = false;
    },
  },
});

export const { setAuth, logout, finishRestore } = authSlice.actions;
export default authSlice.reducer;
