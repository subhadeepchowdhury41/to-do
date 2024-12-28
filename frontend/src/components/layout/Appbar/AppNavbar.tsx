import {
  AppBar,
  Box,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { appDrawerWidth, appNavbarHeight } from "../../../utils/theme";
import { DarkModeOutlined, Menu, WbSunnyOutlined } from "@mui/icons-material";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { ChangeEvent } from "react";

const AppNavbar = ({
  isSm = false,
  handleDrawerToggle,
}: {
  isSm?: boolean;
  handleDrawerToggle: () => void;
}) => {
  const { theme, setTheme } = useAppTheme();
  const handleThemeChange = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setTheme(checked ? "dark" : "light");
  };
  return (
    <>
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          height: `${appNavbarHeight}px`,
          width: isSm ? "100%" : `calc(100% - ${appDrawerWidth}px)`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "background.paper",
          color: "primary.contrastText",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {isSm && <IconButton onClick={handleDrawerToggle} sx={{ borderRadius: "4px" }}>
            <Menu sx={{ color: "secondary.contrastText" }} />
          </IconButton>}
          <Typography
            variant="h6"
            flexGrow={1}
            noWrap
            color="textPrimary"
            component="div"
          >
            Todo App
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", justifySelf: "end" }}
          >
            <WbSunnyOutlined sx={{ color: "secondary.main" }} />
            <Switch value={theme === "dark"} onChange={handleThemeChange} />
            <DarkModeOutlined color="warning" />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppNavbar;
