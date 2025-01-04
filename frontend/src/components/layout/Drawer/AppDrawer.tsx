import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { appDrawerWidth, appNavbarHeight } from "../../../utils/theme";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  Dashboard as DashboardIcon,
  KeyboardArrowDown,
  Logout,
  NotificationsOutlined,
  Today,
  TodayOutlined,
  Upcoming,
  UpcomingOutlined,
} from "@mui/icons-material";
import DrawerItem from "./DrawerItem";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { logoutThunk } from "../../../features/auth/authSlice";
import { enqueueSnackbar } from "notistack";

const AppDrawer = ({
  isSm = false,
  mobileMenuOpen = false,
  handleMobileMenuClose,
}: {
  isSm?: boolean;
  mobileMenuOpen?: boolean;
  handleMobileMenuClose: () => void;
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [currentRoute, setCurrentRoute] = useState("/dashboard");
  const handleSignout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        enqueueSnackbar("Successfully logged out", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
  };
  return (
    <>
      <Drawer
        variant={isSm ? "temporary" : "permanent"}
        sx={{
          width: appDrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            paddingTop: isSm ? `${appNavbarHeight}px` : 0,
            width: appDrawerWidth,
            borderRight: "none",
            boxSizing: "border-box",
            backgroundColor: "background.default",
            zIndex: 5,
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            paddingX: 1,
            paddingTop: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              maxWidth: "50%",
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              paddingX: 1,
              paddingY: 0.8,
              borderRadius: "4px",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                maxWidth: "80%",
              }}
            >
              <Avatar
                sx={{
                  width: 26,
                  height: 26,
                  backgroundColor: "primary.main",
                  fontSize: (theme) => theme.typography.body2.fontSize,
                }}
              >
                {user?.name
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")}
              </Avatar>
              <Box
                sx={{
                  maxWidth: "70%",
                  wordWrap: "break-word",
                }}
              >
                <Typography variant="subtitle1" noWrap>
                  {user?.name}
                </Typography>
              </Box>
            </Box>
            <KeyboardArrowDown
              fontSize="small"
              sx={{ justifySelf: "flex-end" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ borderRadius: "8px" }}>
              <NotificationsOutlined fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Drawer List */}
        <List
          disablePadding
          sx={{
            alignItems: "flex-start",
            justifyContent: "start",
            paddingX: 1,
            flexGrow: 1,
          }}
        >
          <DrawerItem
            icon={<DashboardIcon fontSize="small" />}
            highlightedIcon={<DashboardIcon fontSize="small" />}
            title="Dashboard"
            path="/dashboard"
            onClick={() => setCurrentRoute("/dashboard")}
            highlighted={currentRoute === "/dashboard"}
          />
          <DrawerItem
            icon={<TodayOutlined fontSize="small" />}
            highlightedIcon={<Today fontSize="small" />}
            title="Today"
            path="/today"
            onClick={() => setCurrentRoute("/today")}
            highlighted={currentRoute === "/today"}
          />
          <DrawerItem
            icon={<UpcomingOutlined fontSize="small" />}
            highlightedIcon={<Upcoming fontSize="small" />}
            title="Upcoming"
            path="/upcoming"
            onClick={() => setCurrentRoute("/upcoming")}
            highlighted={currentRoute === "/upcoming"}
          />
        </List>
        <Box sx={{ padding: 1 }}>
          <Button
            onClick={handleSignout}
            color="error"
            size="small"
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              paddingY: 1,
              paddingX: 2,
              width: "100%",
              cursor: "pointer",
              ["&:hover"]: {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <Logout />
            <Typography variant="body2" color="error">
              Logout
            </Typography>
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default AppDrawer;
