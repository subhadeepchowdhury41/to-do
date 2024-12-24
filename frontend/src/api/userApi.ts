import axiosInstance from "../utils/axiosInstance";

const updateName = async (name: string) => {
  const response = await axiosInstance.put("/user/name", { name });
  return response.data;
};

const changePassword = async (password: string) => {
  const response = await axiosInstance.put("/user/password", { password });
  return response.data;
};

export default {
  updateName,
  changePassword,
};
