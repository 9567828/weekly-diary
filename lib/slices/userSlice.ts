import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  isGoogle: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isGoogle: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload; // 전체 교체
    },
    clearUser: () => initialState, // 초기화
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
