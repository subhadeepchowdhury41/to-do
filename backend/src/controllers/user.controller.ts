import { DeepPartial } from "typeorm";
import { User } from "../database/entities/user.entity";
import * as userService from "../services/user.services";
import { hashPassword } from "../utils/encrypt";
import { APISuccess } from "../utils/api.success";
import { StatusCodes } from "http-status-codes";

export const getUsers = async () => {
  const users = await userService.getUsers();
  return new APISuccess(StatusCodes.OK, "Users fetched successfully", users);
}

export const updateUser = async (id: string, updates: DeepPartial<User>) => {
  const updatedUser = await userService.updateUser(id, updates);
  return new APISuccess(
    StatusCodes.OK,
    "User updated successfully",
    updatedUser
  );
};

export const changePassword = async (id: string, newPassword: string) => {
  const newHashedPassword = await hashPassword(newPassword);
  const updatedUser = await userService.changePassword(id, newHashedPassword);
  return new APISuccess(
    StatusCodes.OK,
    "Password changed successfully",
    updatedUser
  );
};
