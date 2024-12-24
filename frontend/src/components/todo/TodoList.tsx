import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchTodos } from "../../features/todo/todoSlice";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <>
      <h1>Todo List</h1>
      <p>This is the todo list page.</p>
      <div>
        {todos.map((todo, index: number) => (
          <div key={index}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
