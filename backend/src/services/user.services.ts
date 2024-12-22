import { DeepPartial } from "typeorm";
import { userRepo } from "../database";
import { User } from "../database/entities/user.entity";

export const getUsers = async () => {
  const users = await userRepo.find();
  return users;
};

export const getUserByEmail = async (email: string) => {
  const user = await userRepo.findOne({ where: { email } });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await userRepo.findOne({ where: { id } });
  return user;
};

export const createUser = async (user: DeepPartial<User>) => {
  const createdUser = await userRepo.save(user);
  return createdUser;
};

export const changePassword = async (id: string, password: string) => {
  return await userRepo.update({ id }, { password });
};

export const updateUser = async (id: string, updates: DeepPartial<User>) => {
  return await userRepo.update({ id }, updates);
};
