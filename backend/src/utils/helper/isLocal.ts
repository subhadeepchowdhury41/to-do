import dotenv from "dotenv";

dotenv.config();

const { ENVIRONMENT } = process.env;

export const isLocal = () => {
  return ENVIRONMENT === "LOCAL";
};
