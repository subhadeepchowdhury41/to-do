import { Router } from "express";
import * as todoController from "../controllers/todo.controller";
import { isValidAccessToken } from "../middlewares/auth.middleware";
import { StatusCodes } from "http-status-codes";
import {
  isValidCreateTodoDto,
  isValidTodoId,
} from "../middlewares/todo.middleware";
import { sendErrorResponse } from "../utils/helper/errorResposne";

const router = Router();

router.get("/", isValidAccessToken, async (req, res) => {
  try {
    const result = await todoController.getTodos(req.body.mutated.user);
    res.status(result.status).send(result);
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
});

router.post("/", isValidAccessToken, isValidCreateTodoDto, async (req, res) => {
  try {
    const result = await todoController.createTodo(
      req.body,
      req.body.mutated.user
    );
    res.status(result.status).send(result);
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
});

router.put("/:todoId", isValidAccessToken, isValidTodoId, async (req, res) => {
  try {
    const { mutated, ...updates } = req.body;
    const result = await todoController.updateTodo(req.params.todoId, updates);
    res.status(result.status).send(result);
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
});

router.delete(
  "/:todoId",
  isValidAccessToken,
  isValidTodoId,
  async (req, res) => {
    try {
      const result = await todoController.deleteTodo(req.params.todoId);
      res.status(result.status).send(result);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }
);

export default router;
