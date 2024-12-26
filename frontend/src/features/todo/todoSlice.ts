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

export const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Partial<Todo>, { rejectWithValue }) => {
    try {
      const response = await AppRestAPI.todo.updateTodo(todo);
      return response.data ? todo : {};
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update todo"
      );
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await AppRestAPI.todo.deleteTodo(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete todo"
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
      })
      .addCase(updateTodoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateTodoThunk.fulfilled,
        (state, action: PayloadAction<Partial<Todo>>) => {
          console.log(action.payload);
          state.loading = false;
          const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          );
          if (index !== -1) {
            state.todos[index] = { ...state.todos[index], ...action.payload };
          }
        }
      )
      .addCase(updateTodoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTodoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTodoThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
        }
      )
      .addCase(deleteTodoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const todoReducer = todoSlice.reducer;
