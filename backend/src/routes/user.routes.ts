import { Router } from "express";
import * as userController from "../controllers/user.controller";
import {
  isValidUpdateUserDto,
  isValidUser,
} from "../middlewares/user.middleware";
import { isValidPassword } from "../middlewares/auth.middleware";

const router = Router();

router.put("/:userId", isValidUpdateUserDto, isValidUser, async (req, res) => {
  try {
    const result = await userController.updateUser(req.params.userId, req.body);
    res.status(result.status).send(result);
  } catch (error: any) {
    res.status(error.status || 500).send(error);
  }
});

router.put("/:userId/change-password", isValidUpdateUserDto, isValidUser, isValidPassword, async (req, res) => {
  try {
    const result = await userController.changePassword(
      req.params.userId,
      req.body.password
    );
    res.status(result.status).send(result);
  } catch (error: any) {
    res.status(error.status || 500).send(error);
  }
});

export default router;