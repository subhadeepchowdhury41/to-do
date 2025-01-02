import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { RefreshToken } from "./entities/refreshToken";
import { Todo } from "./entities/todo.entity";
import { isLocal } from "../utils/helper/isLocal";

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const appDataSource = new DataSource({
  type: "postgres",
  database: isLocal() ? "todo" : DB_NAME,
  host: isLocal() ? "172.27.210.131" : DB_HOST,
  port: 5432,
  username: isLocal() ? "postgres" : DB_USER,
  password: isLocal() ? "subha" : DB_PASS,
  synchronize: true,
  logging: isLocal() ? true : false,
  entities: [User, RefreshToken, Todo],
  ssl: isLocal() ? false : { rejectUnauthorized: false },
});

export const initializeDatabase = async () => {
  await appDataSource.initialize();
};

export const closeDatabase = async () => {
  await appDataSource.destroy();
};

export const userRepo = appDataSource.getRepository(User);
export const todoRepo = appDataSource.getRepository(Todo);
export const refreshTokenRepo = appDataSource.getRepository(RefreshToken);

export default appDataSource;
