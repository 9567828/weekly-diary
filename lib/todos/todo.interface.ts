export interface ITodo {
  id: string;
  text: string;
  userId: string;
  isDone: boolean;
  isTime: boolean;
  time?: string;
  isImport: boolean;
  todoDate: Date;
}
