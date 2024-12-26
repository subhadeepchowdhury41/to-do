import AppDrawer from "../components/layout/Drawer/AppDrawer";
import AppNavbar from "../components/layout/Appbar/AppNavbar";
import TodoList from "../components/todo/TodoList";
import { Box, Fab } from "@mui/material";
import { appDrawerWidth, appNavbarHeight } from "../utils/theme";
import { Add } from "@mui/icons-material";
import CreateTodoPopup from "../components/todo/CreateTodoPopUp";
import { useState } from "react";

const Dashboard = () => {
  const [isTodoPopupOpen, setIsTodoPopupOpen] = useState(false);
  const handleOpenPopup = () => setIsTodoPopupOpen(true);
  const handleClosePopup = () => setIsTodoPopupOpen(false);
  return (
    <>
      <AppDrawer />
      <AppNavbar />
      <Box
        sx={{
          marginTop: `${appNavbarHeight}px`,
          marginLeft: `${appDrawerWidth}px`,
          minHeight: `calc(100vh - ${appNavbarHeight}px)`,
          backgroundColor: "background.paper",
        }}
      >
        <TodoList />
      </Box>
      <CreateTodoPopup
        isPopupOpen={isTodoPopupOpen}
        onClose={handleClosePopup}
      />
      <Fab
        title="Add Todo"
        variant="circular"
        color="primary"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        onClick={handleOpenPopup}
      >
        <Add />
      </Fab>
    </>
  );
};

export default Dashboard;
