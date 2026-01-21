import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InputMode = "add" | "edit" | null;

interface IProps {
  isTodoTexing: InputMode;
  isDiaryTexting: InputMode;
}

const initialState: IProps = {
  isTodoTexing: null,
  isDiaryTexting: null,
};

const tabbarSlice = createSlice({
  name: "tabbar",
  initialState,
  reducers: {
    handleTodo: (state, action: PayloadAction<InputMode>) => {
      state.isTodoTexing = action.payload;
    },
    handleDiary: (state, action: PayloadAction<InputMode>) => {
      state.isDiaryTexting = action.payload;
    },
  },
});

export const { handleTodo, handleDiary } = tabbarSlice.actions;
export default tabbarSlice.reducer;
