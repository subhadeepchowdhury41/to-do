import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { appDrawerWidth } from "../../../utils/theme";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  Dashboard as DashboardIcon,
  KeyboardArrowDown,
  NotificationsOutlined,
  Today,
  TodayOutlined,
  Upcoming,
  UpcomingOutlined,
} from "@mui/icons-material";
import DrawerItem from "./DrawerItem";

const AppDrawer = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: appDrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: appDrawerWidth,
            borderRight: "none",
            boxSizing: "border-box",
            backgroundColor: "background.default",
          },
        }}
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
                  Subhaddeep
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
          }}
        >
          <DrawerItem
            icon={<DashboardIcon fontSize="small" />}
            highlightedIcon={<DashboardIcon fontSize="small" />}
            title="Dashboard"
            path="/dashboard"
            highlighted
          />
          <DrawerItem
            icon={<TodayOutlined fontSize="small" />}
            highlightedIcon={<Today fontSize="small" />}
            title="Today"
            path="/today"
          />
          <DrawerItem
            icon={<UpcomingOutlined fontSize="small" />}
            highlightedIcon={<Upcoming fontSize="small" />}
            title="Upcoming"
            path="/upcoming"
          />
        </List>

        
      </Drawer>
    </>
  );
};

export default AppDrawer;
