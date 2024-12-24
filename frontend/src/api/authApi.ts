import axiosInstance from "../utils/axiosInstance";

const login = async ({
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
  console.log(response.data);
  return response.data;
};

const me = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

const signup = async ({
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

const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export default {
  login,
  me,
  signup,
  logout,
};
