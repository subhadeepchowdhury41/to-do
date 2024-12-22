import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const validAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
};

export const validRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
};
