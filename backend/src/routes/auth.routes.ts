import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import {
  isValidAccessToken,
  isValidLoginDto,
  isValidPassword,
  isValidRefreshToken,
  isValidSignUpDto,
} from "../middlewares/auth.middleware";
import { isNewEmail, isRegisteredEmail } from "../middlewares/user.middleware";
import { StatusCodes } from "http-status-codes";
import { sendErrorResponse } from "../utils/helper/errorResposne";

const router = Router();

router.post(
  "/login",
  isValidLoginDto,
  isRegisteredEmail,
  isValidPassword,
  async (req, res) => {
    try {
      const result = await authController.login(req.body.mutated.user);
      res.status(result.status).send(result);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }
);

router.get("/me", isValidAccessToken, (req, res) => {
  const { password, ...user } = req.body.mutated.user;
  try {
    res.status(StatusCodes.OK).send({ data: user });
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
});

router.post("/signup", isValidSignUpDto, isNewEmail, async (req, res) => {
  try {
    const result = await authController.signup(req.body);
    res.status(result.status).send(result);
  } catch (error: any) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
});

router.post("/refresh", isValidRefreshToken, async (req, res) => {
  try {
    const result = await authController.refresh(
      req.body.mutated.refreshTokenId,
      req.body.mutated.user
    );
    res.status(result.status).send(result);
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
});

router.post("/logout", isValidRefreshToken, async (req, res) => {
  try {
    const result = await authController.logout(req.body.mutated.refreshTokenId);
    res.status(result.status).send(result);
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
});

export default router;
