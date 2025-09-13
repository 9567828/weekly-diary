// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// // 상수 키
// export const TODO = "TODO";

// export interface ITodo {
//   id: string;
//   text: string;
//   isImportant: boolean;
//   isTime: boolean;
//   time: string;
//   isComplete: boolean;
// }

// export interface RootState {
//   toDos: ITodo[];
// }

// // localStorage 관련 유틸 함수들
// export const getLocalItem = (): ITodo[] => {
//   const item = localStorage.getItem(TODO);
//   return item ? (JSON.parse(item) as ITodo[]) : [];
// };

// export const setLocalItem = (updateTodo: ITodo[]) => localStorage.setItem(TODO, JSON.stringify(updateTodo));

// // 초기 상태 불러오기
// // const initialTodos = (): Todo[] => {
// //   const existed = localStorage.getItem(TODO);
// //   if (existed) {
// //     const todos = JSON.parse(existed) as Todo[];
// //     return todos;
// //   }
// //   return [];
// // };

// const initialTodos = (): ITodo[] => {
//   if (typeof window !== "undefined") {
//     const existed = localStorage.getItem(TODO);
//     if (existed) {
//       return JSON.parse(existed) as ITodo[];
//     }
//   }
//   return [];
// };

// // Slice 정의
// const toDoSlice = createSlice({
//   name: "toDosReducer",
//   initialState: initialTodos(),
//   reducers: {
//     add: (state, action: PayloadAction<{ id: string; text: string }>) => {
//       const { text, id } = action.payload;
//       const newTodo: ITodo = {
//         id,
//         text,
//         isImportant: false,
//         isTime: false,
//         time: "09:00",
//         isComplete: false,
//       };
//       state.unshift(newTodo);
//     },
//     remove: (state, action: PayloadAction<string>) => {
//       // immer 덕분에 state.filter는 반환해도 되고, state.splice 같은 방식도 가능
//       return state.filter((todo) => todo.id !== action.payload);
//     },
//     edit: (
//       state,
//       action: PayloadAction<{
//         text: string;
//         id: string;
//         isImportant: boolean;
//         isTime: boolean;
//         time: string;
//         isComplete: boolean;
//       }>
//     ) => {
//       const { text, id, isImportant, isTime, time, isComplete } = action.payload;

//       return state.map((todo) =>
//         todo.id === id
//           ? {
//               ...todo,
//               text,
//               isImportant,
//               isTime,
//               time: isTime ? time : "",
//               isComplete,
//             }
//           : todo
//       );
//     },
//   },
// });

// // 액션 export
// export const { add, remove, edit } = toDoSlice.actions;

// // 스토어 생성
// export const store = configureStore({
//   reducer: { toDos: toDoSlice.reducer },
// });

// // 스토어 관련 타입 추출
// export type AppDispatch = typeof store.dispatch;
// export type RootStateType = ReturnType<typeof store.getState>;

// slice 분류 할 때 아래 코드로 쓰기
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todos/todoSlice";
import diaryReducer from "./slices/diarySlice";
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
