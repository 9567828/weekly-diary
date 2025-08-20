import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Diary {
  id: number;
  title: string;
  content: string;
}

const initialState: Diary[] = [];

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    addDiary: (state, action: PayloadAction<Diary>) => {
      state.unshift(action.payload);
    },
    removeDiary: (state, action: PayloadAction<number>) => {
      return state.filter((d) => d.id !== action.payload);
    },
    editDiary: (state, action: PayloadAction<Diary>) => {
      return state.map((d) => (d.id === action.payload.id ? action.payload : d));
    },
  },
});

export const { addDiary, removeDiary, editDiary } = diarySlice.actions;
export default diarySlice.reducer;
