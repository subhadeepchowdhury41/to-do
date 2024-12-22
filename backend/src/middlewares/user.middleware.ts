import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.services";
import { APIerror } from "../utils/api.error";
import { StatusCodes } from "http-status-codes";
import { validate } from "class-validator";
import { UpdateUserDto } from "../dto/update-user.dto";
import { sendErrorResponse } from "../utils/helper/errorResposne";

export const isRegisteredEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new APIerror(StatusCodes.NOT_FOUND, "Email is not registered");
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

export const isNewEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (user) {
      throw new APIerror(
        StatusCodes.BAD_REQUEST,
        "Email is already registered"
      );
    }
    next();
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
};

export const isValidUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.userId || req.params.userId || req.query.userId;
    const user = await userService.getUserById(id);
    if (!user) {
      throw new APIerror(StatusCodes.NOT_FOUND, "User not found");
    }
    req.body = {
      ...req.body,
      mutated: {
        user,
      },
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const isValidUpdateUserDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateUserDto = Object.assign(new UpdateUserDto(), req.body);
    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      throw new APIerror(StatusCodes.BAD_REQUEST, "Validation error", errors);
    }
    next();
  } catch (error) {
    next(error);
  }
};
