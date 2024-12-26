import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchTodos } from "../../features/todo/todoSlice";
import { Box } from "@mui/material";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {todos.map((todo, index: number) => (
          <TodoListItem key={index} todo={todo} />
        ))}
      </Box>
    </>
  );
};

export default TodoList;
