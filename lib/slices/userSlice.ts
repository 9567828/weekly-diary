import { createClient } from "@/utils/supabase/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUser {
  isLoggedIn: boolean;
  userId: string | null;
}

const initialState: IUser = {
  isLoggedIn: false,
  userId: null,
};

export const fetchUserThunk = createAsyncThunk("auth/fetchUser", async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  return data.user?.id ?? null;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      (state.isLoggedIn = !!action.payload), (state.userId = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      (state.isLoggedIn = true), (state.userId = action.payload);
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
