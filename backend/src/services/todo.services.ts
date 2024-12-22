import { DeepPartial } from "typeorm";
import { todoRepo } from "../database";
import { Todo } from "../database/entities/todo.entity";
import { User } from "../database/entities/user.entity";

export const createTodo = async (todo: DeepPartial<Todo>) => {
  const newTodo = todoRepo.create(todo);
  return await todoRepo.save(newTodo);
};

export const getTodos = async (user: User) => {
  const todos = await todoRepo.find({ where: { user } });
  return todos;
};

export const getTodoById = async (id: string) => {
  const todo = await todoRepo.findOne({ where: { id } });
  return todo;
};

export const updateTodo = async (id: string, updates: DeepPartial<Todo>) => {
  return await todoRepo.update(id, updates);
};

export const deleteTodo = async (id: string) => {
  return await todoRepo.delete({ id });
};
