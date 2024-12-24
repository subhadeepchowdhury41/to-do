import { CreateTodoForm } from "../components/todo/CreateTodoForm";
import TodoList from "../components/todo/TodoList";
import AppEditor from "../components/ui/AppEditor";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
      <CreateTodoForm />
      <TodoList />
      <div style={{ height: "50vh", width: "100%" }}>
        <AppEditor />
      </div>
    </>
  );
};

export default Dashboard;
