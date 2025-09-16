import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiary } from "./diary.interface";
import {
  addDiaryThunk,
  deleteDiaryThunk,
  editDiaryThunk,
  selectAllDiary,
  selectOneDiary,
  selectWeeklyDiary,
} from "./diary.thunk";

const initialState = {
  all: [] as IDiary[],
  currDate: [] as IDiary[],
  range: [] as IDiary[], // 주간/월간 범위
  viewMode: "week" as "week" | "month", // 현재 뷰 모드
  weekCount: 0,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setWeekCount: (state, action: PayloadAction<number>) => {
      state.weekCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDiaryThunk.fulfilled, (state, action: PayloadAction<IDiary>) => {
        const diary = action.payload;
        state.all.push(diary);
        state.currDate.push(diary);
        state.range.push(diary);
      })
      .addCase(selectAllDiary.fulfilled, (state, action) => {
        state.all = action.payload ?? [];
      })
      .addCase(selectOneDiary.fulfilled, (state, action: PayloadAction<IDiary[]>) => {
        state.currDate = action.payload;
      })
      .addCase(selectWeeklyDiary.fulfilled, (state, action) => {
        state.range = action.payload ?? [];
      })
      .addCase(editDiaryThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const allIdx = state.all.findIndex((d) => d.id === updated.id);
        if (allIdx >= 0) state.all[allIdx] = updated;

        const currDateIdx = state.currDate.findIndex((d) => d.id === updated.id);
        if (currDateIdx >= 0) state.currDate[currDateIdx] = updated;

        const rangeIdx = state.range.findIndex((d) => d.id === updated.id);
        if (rangeIdx >= 0) state.range[rangeIdx] = updated;
      })
      .addCase(deleteDiaryThunk.fulfilled, (state, action) => {
        const allIdx = state.all.findIndex((d) => d.id === action.payload);
        if (allIdx >= 0) state.all.splice(allIdx, 1);

        const currDateIdx = state.currDate.findIndex((d) => d.id === action.payload);
        if (currDateIdx >= 0) state.currDate.splice(currDateIdx, 1);

        const rangeIdx = state.range.findIndex((d) => d.id === action.payload);
        if (rangeIdx >= 0) state.range.splice(rangeIdx, 1);
      });
  },
});

export const { setWeekCount } = diarySlice.actions;
export default diarySlice.reducer;
