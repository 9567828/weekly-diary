import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import tabbarReducer from "./slices/tabbarSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tabbar: tabbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
