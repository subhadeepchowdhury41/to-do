import { EventOutlined, MoreHoriz } from "@mui/icons-material";
import {
  Paper,
  Box,
  Checkbox,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { MouseEvent, useState } from "react";
import { Todo } from "../../types/todo.type";

const TodoListItem = ({ todo }: { todo: Todo }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const moreMenuOpen = Boolean(anchorEl);
  const handleMoreMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreMenuClose = () => {
    setAnchorEl(null);
  };
  const [hovering, setHovering] = useState(false);
  const handleMouseEnter = () => {
    setHovering(true);
  };
  const handleMouseLeave = () => {
    setHovering(false);
  };
  return (
    <Paper
      elevation={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: "70%",
        backgroundColor: "background.paper",
        borderBottom: `1px solid`,
        borderColor: (theme) => theme.palette.divider,
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        paddingY: 1,
        gap: 0.5,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <Checkbox />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          gap: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "text.primary",
          }}
        >
          {todo.title}
        </Typography>
        {todo.description && todo.description !== "" && (
          <Typography variant="subtitle1">{todo.description}</Typography>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            color: "secondary.main",
            paddingY: 0.5,
          }}
        >
          <EventOutlined fontSize="small" />
          <Typography variant="subtitle2">
            {dayjs(todo.duedate!).format("DD MMM YYYY")}
          </Typography>
        </Box>
      </Box>
      {hovering && (
        <Box sx={{ justifySelf: "flex-end" }}>
          <IconButton onClick={handleMoreMenuOpen}>
            <MoreHoriz fontSize="small" />
          </IconButton>
        </Box>
      )}
      <Menu
        open={moreMenuOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handleMoreMenuClose}
      >
        <MenuItem>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default TodoListItem;
