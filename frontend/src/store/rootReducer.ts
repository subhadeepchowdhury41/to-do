import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { todoReducer } from "../features/todo/todoSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
