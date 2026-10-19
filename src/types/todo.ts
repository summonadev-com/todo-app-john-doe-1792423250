export type Todo = {
  id: string;
  title: string;
  done: boolean;
  dueDate: string | null; // YYYY-MM-DD
  createdAt: number;
};
