import { Box } from "@mui/material";
import TodoListItem from "../components/todo/TodoListItem";
import { fetchTodos } from "../features/todo/todoSlice";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import dayjs from "dayjs";

const Today = () => {
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
        {todos
          .filter(
            (todo) =>
              dayjs(todo.duedate).format("YYYY-MM-DD") ===
              dayjs(new Date()).format("YYYY-MM-DD")
          )
          .map((todo, index: number) => (
            <TodoListItem key={index} todo={todo} />
          ))}
      </Box>
    </>
  );
};

export default Today;
