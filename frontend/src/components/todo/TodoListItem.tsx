import { EventOutlined, MoreHoriz } from "@mui/icons-material";
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
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { Todo } from "../../types/todo.type";
import { formatDate } from "../../utils/formatDate";
import { DateCalendar } from "@mui/x-date-pickers";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateTodoThunk } from "../../features/todo/todoSlice";
import { enqueueSnackbar } from "notistack";

const TodoListItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const moreMenuOpen = Boolean(anchorEl);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const dueDateOpen = Boolean(anchorEl2);
  const [hovering, setHovering] = useState(false);
  const [newDuedate, setNewDuedate] = useState<Date | null>(null);
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
      </Box>
      {hovering && (
        <Box sx={{ justifySelf: "flex-end" }}>
          <IconButton onClick={handleMoreMenuOpen} sx={{ borderRadius: "4px" }}>
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
        <DateCalendar onChange={handleDuedateChange} />
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
    </Paper>
  );
};

export default TodoListItem;
