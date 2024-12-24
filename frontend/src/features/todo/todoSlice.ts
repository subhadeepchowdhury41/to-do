/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/todo.type";
import { AppRestAPI } from "../../api";

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AppRestAPI.todo.getTodos();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch todos"
      );
    }
  }
);

export const createTodoThunk = createAsyncThunk(
  "todos/createTodo",
  async (todo: Todo, { rejectWithValue }) => {
    try {
      const response = await AppRestAPI.todo.createTodo(todo);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create todo"
      );
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTodoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTodoThunk.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          state.loading = false;
          state.todos.push(action.payload);
        }
      )
      .addCase(createTodoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const todoReducer = todoSlice.reducer;
