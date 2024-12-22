import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const sendErrorResponse = (
  res: Response,
  error: any,
) => {
  return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send({
    status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message,
    errors: error.errors,
  });
};