import { refreshTokenRepo } from "../database";
import { User } from "../database/entities/user.entity";

export const storeRefreshToken = async (user: User, refreshToken: string) => {
  await refreshTokenRepo.save({ user, token: refreshToken });
};

export const getFreshTokenIdByToken = async (token: string) => {
  return await refreshTokenRepo.findOne({ where: { token } });
};

export const deleteRefreshToken = async (refreshTokenId: string) => {
  return await refreshTokenRepo.delete(refreshTokenId);
};
