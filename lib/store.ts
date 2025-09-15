import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todos/todoSlice";
import diaryReducer from "./diary/diarySlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    toDos: todoReducer,
    diaries: diaryReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
