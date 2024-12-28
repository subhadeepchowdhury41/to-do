import { CommentOutlined, EventOutlined, MoreHoriz } from "@mui/icons-material";
import {
  Paper,
  Box,
  Checkbox,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Todo } from "../../types/todo.type";
import { formatDate } from "../../utils/formatDate";
import { DateCalendar } from "@mui/x-date-pickers";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  deleteTodoThunk,
  updateTodoThunk,
} from "../../features/todo/todoSlice";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import EditTodoPopup from "./EditTodoPopUp";
import { getStatusColor } from "../../utils/theme";

const TodoListItem = ({ todo }: { todo: Todo }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const moreMenuOpen = Boolean(anchorEl);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const dueDateOpen = Boolean(anchorEl2);
  const [hovering, setHovering] = useState(false);
  const [newDuedate, setNewDuedate] = useState<Date | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const handleCheckMarkChange = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    dispatch(
      updateTodoThunk({
        id: todo.id,
        status: checked ? "DONE" : "TODO",
      })
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar("Todo updated Successfully", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
  };
  const handleEditOpenOpen = () => {
    setEditOpen(true);
  };
  const handleEditOpenClose = () => {
    handleMouseLeave();
    setEditOpen(false);
  };
  const handleDuedateChange = (val: Date) => {
    setNewDuedate(val);
  };
  const handleUpdateDuedate = () => {
    if (!newDuedate) return;
    dispatch(
      updateTodoThunk({
        id: todo.id,
        duedate: newDuedate,
      })
    )
      .unwrap()
      .then(() => {
        setNewDuedate(null);
        handleDueDateClose();
        handleMouseLeave();
        handleMoreMenuClose();
        enqueueSnackbar("Duedate updated Successfully", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
  };
  const handleMoreMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreMenuClose = () => {
    handleMouseLeave();
    setAnchorEl(null);
  };
  const handleDueDateOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleDueDateClose = () => {
    handleMouseLeave();
    setAnchorEl2(null);
  };
  const handleMouseEnter = () => {
    setHovering(true);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
    setHovering(false);
  };
  const handleDelete = () => {
    dispatch(deleteTodoThunk(todo.id!))
      .unwrap()
      .then(() => {
        handleMoreMenuClose();
        enqueueSnackbar("Todo deleted successfully", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
  };
  return (
    <Paper
      elevation={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: isSmall ? "95%" : "70%",
        backgroundColor: "background.paper",
        borderBottom: `1px solid`,
        borderColor: (theme) => theme.palette.divider,
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        paddingY: 1,
        gap: 0.5,
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <Checkbox checked={todo.status === "DONE"} onChange={handleCheckMarkChange} />
      </Box>
      <Box
        sx={{
          width: isSmall ? "60%" : "75%",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="body1"
            noWrap
            sx={{
              color: "text.primary",
            }}
          >
            {todo.title}
          </Typography>
        </Box>
        {todo.description && todo.description !== "" && (
          <Typography
            variant="subtitle1"
            sx={{
              width: "75%",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
            }}
          >
            {todo.description}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
            <div onClick={handleDueDateOpen}>
              <Typography
                variant="subtitle2"
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                    color: "lightsteelblue",
                  },
                }}
              >
                {formatDate(todo.duedate)}
              </Typography>
            </div>
          </Box>
          <Box
            sx={{
              border: "1px solid",
              borderColor: getStatusColor(todo.status),
              borderRadius: "4px",
              paddingY: 0.25,
              paddingX: 0.5,
              scale: 0.85,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                textTransform: "capitalize",
                color: getStatusColor(todo.status),
              }}
            >
              {String(todo.status).replace("_", " ").toLowerCase()}
            </Typography>
          </Box>
        </Box>
      </Box>
      {hovering && (
        <Box sx={{ position: "absolute", right: 0 }}>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton sx={{ borderRadius: "4px" }}>
              <CommentOutlined fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleMoreMenuOpen}
              sx={{ borderRadius: "4px" }}
            >
              <MoreHoriz fontSize="small" />
            </IconButton>
          </Box>
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
        <MenuItem onClick={handleEditOpenOpen}>
          <Typography variant="body2">Edit</Typography>
        </MenuItem> 
        <MenuItem onClick={handleDelete}>
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>
      <Menu
        open={dueDateOpen}
        anchorEl={anchorEl2}
        onClose={handleDueDateClose}
      >
        <Typography
          sx={{
            paddingTop: 1,
            paddingBottom: 1,
            paddingX: 2,
            color: "secondary.contrastText",
          }}
          variant="h6"
        >
          Change Due Date
        </Typography>
        <Divider sx={{ marginX: 1 }} />
        <DateCalendar
          defaultValue={dayjs(todo.duedate)}
          onChange={handleDuedateChange}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginX: 1 }}>
          <Button
            variant="contained"
            onClick={handleUpdateDuedate}
            sx={{
              borderRadius: "4px",
              color: "primary.contrastText",
            }}
          >
            Update
          </Button>
        </Box>
      </Menu>
      <EditTodoPopup
        isPopupOpen={editOpen}
        onClose={handleEditOpenClose}
        todo={todo}
      />
    </Paper>
  );
};

export default TodoListItem;
