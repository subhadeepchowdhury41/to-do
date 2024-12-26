import { StatusCodes } from "http-status-codes";
import { User } from "../database/entities/user.entity";
import * as todoServices from "../services/todo.services";
import { APISuccess } from "../utils/api.success";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";

export const getTodos = async (user: User) => {
  const todos = await todoServices.getTodos(user);
  return new APISuccess(StatusCodes.OK, "Todos fetched successfully", todos);
};

export const createTodo = async (todo: CreateTodoDto, user: User) => {
  const createdTodo = await todoServices.createTodo({
    description: todo.description,
    title: todo.title!,
    duedate: todo.duedate!,
    status: todo.status!,
    user,
  });
  return new APISuccess(StatusCodes.CREATED, "Todo created successfully", {
    ...createdTodo,
  });
};

export const updateTodo = async (id: string, todo: UpdateTodoDto) => {
  const updatedTodo = await todoServices.updateTodo(id, todo);
  return new APISuccess(StatusCodes.OK, "Todo updated successfully", {
    todo: updatedTodo,
  });
};

export const deleteTodo = async (id: string) => {
  const deletedTodo = await todoServices.deleteTodo(id);
  return new APISuccess(StatusCodes.OK, "Todo deleted successfully", {
    todo: deletedTodo,
  });
};
