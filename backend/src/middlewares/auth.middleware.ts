import { NextFunction, Request, Response } from "express";
import { validAccessToken, validRefreshToken } from "../utils/jwt";
import { comparePassword } from "../utils/encrypt";
import { LoginDto } from "../dto/login.dto";
import { validate } from "class-validator";
import { APIerror } from "../utils/api.error";
import { StatusCodes } from "http-status-codes";
import { SignUpDto } from "../dto/signup.dto";
import * as userService from "../services/user.services";
import * as authService from "../services/auth.services";
import { sendErrorResponse } from "../utils/helper/errorResposne";

export const isValidAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1];
    if (!accessToken) {
      throw new APIerror(StatusCodes.UNAUTHORIZED, "No token found");
    }
    const id = validAccessToken(accessToken).id;
    if (!id) {
      throw new APIerror(StatusCodes.UNAUTHORIZED, "Invalid token");
    }
    const user = await userService.getUserById(id);
    if (!user) {
      throw new APIerror(StatusCodes.UNAUTHORIZED, "User not found");
    }
    req.body = {
      ...req.body,
      mutated: {
        user,
      },
    };
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const isValidRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      throw new APIerror(StatusCodes.UNAUTHORIZED, "No refresh token found");
    }
    const id = validRefreshToken(refreshToken).id;
    if (!id) {
      throw new APIerror(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
    }
    const refreshTokenId = await authService.getFreshTokenIdByToken(
      refreshToken
    );
    if (!refreshTokenId) {
      res.status(StatusCodes.BAD_REQUEST).send({
        status: StatusCodes.BAD_REQUEST,
        message: "Already logged out",
      });
      return;
    }
    const user = await userService.getUserById(id);
    if (!user) {
      throw new APIerror(StatusCodes.UNAUTHORIZED, "User not found");
    }
    req.body = {
      ...req.body,
      mutated: {
        user,
        refreshTokenId,
      },
    };
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Needs user mutated
export const isValidPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const password = req.body.password || req.body.oldPassword;
    const user = req.body.mutated.user;
    const correctPassword = await comparePassword(password, user.password);
    console.log(user, correctPassword);
    if (!correctPassword) {
      throw new APIerror(StatusCodes.UNAUTHORIZED, "Password is not correct");
    }
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Checks if login dto is valid
export const isValidLoginDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginDto = Object.assign(new LoginDto(), req.body);
    const errors = await validate(loginDto);
    if (errors.length > 0) {
      throw new APIerror(StatusCodes.BAD_REQUEST, "Validation error", errors);
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Checks if signup dto is valid
export const isValidSignUpDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const signUpDto = Object.assign(new SignUpDto(), req.body);
    const errors = await validate(signUpDto);
    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send({
        status: StatusCodes.BAD_REQUEST,
        message: "Validation error",
        errors,
      });
    }
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
