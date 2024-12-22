import { NextFunction, Request, Response } from "express";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { validate } from "class-validator";
import { APIerror } from "../utils/api.error";
import { StatusCodes } from "http-status-codes";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import * as todoServices from "../services/todo.services";
import { sendErrorResponse } from "../utils/helper/errorResposne";

export const isValidCreateTodoDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createTodoDto = Object.assign(new CreateTodoDto(), req.body);
    const errors = await validate(createTodoDto);
    console.log(errors);
    if (errors.length > 0) {
      throw new APIerror(StatusCodes.BAD_REQUEST, "Validation error", errors);
    }
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const isValidUpdateTodoDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateTodoDto = Object.assign(new UpdateTodoDto(), req.body);
    const errors = await validate(updateTodoDto);
    if (errors.length > 0) {
      throw new APIerror(StatusCodes.BAD_REQUEST, "Validation error", errors);
    }
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const isValidTodoId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.todoId || req.params.todoId || req.query.todoId;
    if (!id) {
      throw new APIerror(StatusCodes.BAD_REQUEST, "Validation error");
    }
    const todo = await todoServices.getTodoById(id);
    if (!todo) {
      throw new APIerror(StatusCodes.BAD_REQUEST, "Todo not found");
    }
    req.body = {
      ...req.body,
      mutated: {
        ...req.body.mutated,
        todo,
      },
    };
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
