import { AppBar, Box, Switch, Toolbar, Typography } from "@mui/material";
import { appDrawerWidth, appNavbarHeight } from "../../../utils/theme";
import { DarkModeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { ChangeEvent } from "react";

const AppNavbar = () => {
  const { setTheme } = useAppTheme();
  const handleThemeChange = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };
  return (
    <>
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          height: `${appNavbarHeight}px`,
          width: `calc(100% - ${appDrawerWidth}px)`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "background.paper",
          color: "primary.contrastText",
        }}
      >
        <Toolbar>
          <Typography variant="h6" flexGrow={1} noWrap component="div">
            Todo App
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", justifySelf: "end" }}
          >
            <WbSunnyOutlined sx={{ color: "secondary.main" }} />
            <Switch onChange={handleThemeChange} />
            <DarkModeOutlined color="warning" />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppNavbar;
