import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiary } from "./diary.interface";
import { addDiaryThunk, editDiary, selectAllDiary, selectOneDiary, selectWeeklyDiary } from "./diary.thunk";

const initialState = {
  all: [] as IDiary[],
  currDate: [] as IDiary[],
  range: [] as IDiary[], // 주간/월간 범위
  viewMode: "week" as "week" | "month", // 현재 뷰 모드
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDiaryThunk.fulfilled, (state, action: PayloadAction<IDiary>) => {
        const diary = action.payload;

        state.all.push(diary);

        if (state.currDate.length > 0 && state.currDate[0].diaryDate === diary.diaryDate) {
          state.currDate.push(diary);
        }

        if (state.range.length > 0) {
          const start = state.range[0].diaryDate;
          const end = state.range[state.range.length - 1].diaryDate;
          if (diary.diaryDate >= start && diary.diaryDate <= end) {
            state.range.push(diary);
          }
        }
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
      .addCase(editDiary.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const allIdx = state.all.findIndex((d) => d.id === updated.id);
        if (allIdx >= 0) state.all[allIdx] = updated;

        const currDateIdx = state.currDate.findIndex((d) => d.id === updated.id);
        if (currDateIdx >= 0) state.currDate[currDateIdx] = updated;

        const rangeIdx = state.range.findIndex((d) => d.id === updated.id);
        if (rangeIdx >= 0) state.range[rangeIdx] = updated;
      });
  },
});

export default diarySlice.reducer;
