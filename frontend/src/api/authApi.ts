import axiosInstance from "../utils/axiosInstance";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const me = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
}

export const signup = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/signup", {
    name,
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
