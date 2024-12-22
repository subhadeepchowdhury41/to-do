import { Router } from "express";
import * as todoController from "../controllers/todo.controller";
import { isValidAccessToken } from "../middlewares/auth.middleware";
import { StatusCodes } from "http-status-codes";
import {
  isValidCreateTodoDto,
  isValidTodoId,
} from "../middlewares/todo.middleware";

const router = Router();

router.get("/", isValidAccessToken, async (req, res) => {
  try {
    const result = await todoController.getTodos(req.body.mutated.user);
    res.status(result.status).send(result);
  } catch (error: any) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send(error);
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
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

router.put("/:todoId", isValidAccessToken, isValidTodoId, async (req, res) => {
  try {
    const result = await todoController.updateTodo(
      req.body,
      req.body.mutated.user
    );
    res.status(result.status).send(result);
  } catch (error: any) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send(error);
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
      res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

export default router;
