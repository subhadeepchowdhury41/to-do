import { User } from "../database/entities/user.entity";
import { LoginDto } from "../dto/login.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import * as authServices from "../services/auth.services";
import * as userSrevice from "../services/user.services";
import { APISuccess } from "../utils/api.success";
import { StatusCodes } from "http-status-codes";
import { SignUpDto } from "../dto/signup.dto";
import { hashPassword } from "../utils/encrypt";

export const login = async (user: User) => {
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await authServices.storeRefreshToken(user, refreshToken);
  return new APISuccess(StatusCodes.OK, "Loggin Successful", {
    accessToken,
    refreshToken,
  });
};

export const signup = async (signUpDto: SignUpDto) => {
  try {
    const password = await hashPassword(signUpDto.password);
    const user = await userSrevice.createUser({ ...signUpDto, password });
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    await authServices.storeRefreshToken(user, refreshToken);
    console.log(accessToken, refreshToken, user);
    return new APISuccess(StatusCodes.OK, "Signup Successful", {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw error;
  }
};

export const refresh = async (refreshTokenId: string, user: User) => {
  await authServices.deleteRefreshToken(refreshTokenId);
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await authServices.storeRefreshToken(user, refreshToken);
  return new APISuccess(StatusCodes.OK, "Refresh Successful", {
    accessToken,
    refreshToken,
  });
};

export const logout = async (id: string) => {
  const deletedToken = await authServices.deleteRefreshToken(id);
  return new APISuccess(StatusCodes.OK, "Logout Successful", { deletedToken });
};
