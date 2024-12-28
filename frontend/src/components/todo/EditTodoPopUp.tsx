import { Form, Formik } from "formik";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import AppTextField from "../ui/AppTextField";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  useTheme,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import AppDatePicker from "../ui/AppDatePicker";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import { updateTodoThunk } from "../../features/todo/todoSlice";
import Grow from "@mui/material/Grow";
import {
  Check,
  EventOutlined,
  FastForward,
  Refresh,
} from "@mui/icons-material";
import { Todo } from "../../types/todo.type";

const editTodoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
  duedate: Yup.date().required("Due date is required"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["TODO", "IN_PROGRESS", "DONE"], "Invalid status"),
});

const EditTodoPopup = ({
  isPopupOpen,
  onClose,
  todo,
}: {
  isPopupOpen: boolean;
  onClose: () => void;
  todo: Partial<Todo>;
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const handleEditTodo = (values: {
    title: string;
    description: string;
    duedate: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
  }) => {
    dispatch(
      updateTodoThunk({
        id: todo.id,
        ...values,
        duedate: new Date(values.duedate),
      })
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar("Todo updated successfully", { variant: "success" });
        onClose();
      })
      .catch((error) => {
        enqueueSnackbar(error || "Something went wrong", { variant: "error" });
      });
  };
  const handleClosePopup = () => onClose();
  return (
    <>
      <Dialog
        open={isPopupOpen}
        onClose={handleClosePopup}
        aria-labelledby="edit-todo-dialog"
        TransitionComponent={Grow}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          id="edit-todo-dialog"
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Edit Todo
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: todo.title!,
              description: todo.description || "",
              duedate: String(new Date(todo.duedate!)),
              status: todo.status!,
            }}
            validationSchema={editTodoSchema}
            onSubmit={handleEditTodo}
            validateOnChange
          >
            {({ values, setFieldValue, resetForm }) => (
              <Form>
                <AppTextField
                  name="title"
                  label="Title"
                  placeholder="Title"
                  type="text"
                  size="small"
                  fullWidth
                  required
                  sx={{
                    mt: 1,
                    "& .MuiOutlinedInput-root": {
                      border: "none",
                      backgroundColor: "transparent",
                    },
                  }}
                />
                <AppTextField
                  name="description"
                  label="Description"
                  type="text"
                  placeholder="Description"
                  fullWidth
                  multiline
                  size="small"
                  rows={3}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "none",
                      backgroundColor: "transparent",
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px 14px",
                    },
                  }}
                />
                <AppDatePicker name="duedate" label="Due Date" />
                {isSm ? (
                  <AppTextField
                    select
                    name="status"
                    label="Status"
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    <MenuItem value="TODO">Todo</MenuItem>
                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                    <MenuItem value="DONE">Done</MenuItem>
                  </AppTextField>
                ) : (
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <ToggleButtonGroup
                      size="small"
                      exclusive
                      fullWidth
                      onChange={(_, val) => setFieldValue("status", val)}
                      value={values.status}
                      aria-label="Status"
                      color="primary"
                    >
                      <ToggleButton value="TODO" aria-label="TODO">
                        <EventOutlined />
                        <Typography variant="button" sx={{ ml: 1 }}>
                          Todo
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        value="IN_PROGRESS"
                        aria-label="IN_PROGRESS"
                      >
                        <FastForward />
                        <Typography variant="button" sx={{ ml: 1 }}>
                          In Progress
                        </Typography>
                      </ToggleButton>
                      <ToggleButton value="DONE" aria-label="DONE">
                        <Check />
                        <Typography variant="button" sx={{ ml: 1 }}>
                          Done
                        </Typography>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                )}
                <DialogActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    sx={{ borderRadius: "4px" }}
                    onClick={() => resetForm()}
                    color="error"
                    variant="outlined"
                  >
                    <Refresh fontSize="small" />
                    Reset
                  </Button>
                  <div style={{ display: "flex", gap: "0.5em" }}>
                    <Button
                      sx={{
                        borderRadius: "4px",
                      }}
                      onClick={handleClosePopup}
                      color="info"
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{
                        borderRadius: "4px",
                      }}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </div>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditTodoPopup;
