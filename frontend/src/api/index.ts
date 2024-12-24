import authApi from "./authApi";
import todoApi from "./todoApi";
import userApi from "./userApi";

export const AppRestAPI = {
  auth: authApi,
  todo: todoApi,
  user: userApi
}