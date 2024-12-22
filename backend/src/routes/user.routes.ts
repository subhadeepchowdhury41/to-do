import { Router } from "express";
import * as userController from "../controllers/user.controller";
import {
  isValidUpdateUserDto,
  isValidUser,
} from "../middlewares/user.middleware";
import { isValidPassword } from "../middlewares/auth.middleware";
import { sendErrorResponse } from "../utils/helper/errorResposne";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await userController.getUsers();
    res.status(result.status).send(result);
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
});

router.put("/:userId", isValidUpdateUserDto, isValidUser, async (req, res) => {
  try {
    const { mutated, ...updates } = req.body;
    const result = await userController.updateUser(req.params.userId, updates);
    res.status(result.status).send(result);
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
});

router.put(
  "/:userId/change-password",
  isValidUser,
  isValidPassword,
  async (req, res) => {
    try {
      const result = await userController.changePassword(
        req.params.userId,
        req.body.newPassword
      );
      res.status(result.status).send(result);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }
);

export default router;
