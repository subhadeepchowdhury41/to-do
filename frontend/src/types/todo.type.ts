export interface Todo {
  id?: string;
  title: string;
  description?: string;
  status: "TODO" | "DONE" | "IN_PROGRESS";
  user?: string;
  createdAt?: Date;
  duedate: Date;
}
