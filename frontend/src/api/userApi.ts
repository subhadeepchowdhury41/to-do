import axiosInstance from "../utils/axiosInstance";

export const updateName = async (name: string) => {
  const response = await axiosInstance.put("/user/name", { name });
  return response.data;
};

export const changePassword = async (password: string) => {
  const response = await axiosInstance.put("/user/password", { password });
  return response.data;
};