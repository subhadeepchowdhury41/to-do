import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { RefreshToken } from "./entities/refreshToken";
import { Todo } from "./entities/todo.entity";

const appDataSource = new DataSource({
  type: "postgres",
  database: "todo",
  host: "172.27.210.131",
  port: 5432,
  username: "postgres",
  password: "subha",
  synchronize: true,
  logging: false,
  entities: [User, RefreshToken, Todo],
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
