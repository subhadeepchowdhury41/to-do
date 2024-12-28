import { Box, Fab, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import AppDrawer from "../components/layout/Drawer/AppDrawer";
import AppNavbar from "../components/layout/Appbar/AppNavbar";
import { appDrawerWidth, appNavbarHeight } from "../utils/theme";
import CreateTodoPopup from "../components/todo/CreateTodoPopUp";
import { Outlet } from "react-router-dom";
import { Add } from "@mui/icons-material";

const Home = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isTodoPopupOpen, setIsTodoPopupOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };
  const handleMobileDrawerToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };
  const handleOpenPopup = () => setIsTodoPopupOpen(true);
  const handleClosePopup = () => setIsTodoPopupOpen(false);
  return (
    <>
      <AppDrawer
        mobileMenuOpen={mobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        isSm={isSm}
      />
      <AppNavbar handleDrawerToggle={handleMobileDrawerToggle} isSm={isSm} />
      <Box
        sx={{
          marginTop: `${appNavbarHeight}px`,
          marginLeft: isSm ? 0 : `${appDrawerWidth}px`,
          minHeight: `calc(100vh - ${appNavbarHeight}px)`,
          backgroundColor: "background.paper",
        }}
      >
        <Outlet />
      </Box>
      <CreateTodoPopup
        isPopupOpen={isTodoPopupOpen}
        onClose={handleClosePopup}
      />
      <Fab
        title="Add Todo"
        variant="circular"
        color="primary"
        sx={{ position: "fixed", bottom: 30, right: 30, zIndex: 1 }}
        onClick={handleOpenPopup}
      >
        <Add />
      </Fab>
    </>
  );
};

export default Home;
