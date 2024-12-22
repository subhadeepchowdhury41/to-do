import { Todo } from "../types/todo.type";
import axiosInstance from "../utils/axiosInstance";

export const getTodos = async () => {
  const response = await axiosInstance.get("/todo");
  return response.data;
};

export const createTodo = async (todo: Todo) => {
  const response = await axiosInstance.post("/todo", todo);
  return response.data;
}

export const updateTodo = async (todo: Todo) => {
  const response = await axiosInstance.put(`/todo/${todo.id}`, todo);
  return response.data;
}

export const deleteTodo = async (id: string) => {
  const response = await axiosInstance.delete(`/todo/${id}`);
  return response.data;
}