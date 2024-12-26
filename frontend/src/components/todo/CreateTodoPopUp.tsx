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
} from "@mui/material";
import AppDatePicker from "../ui/AppDatePicker";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import { createTodoThunk } from "../../features/todo/todoSlice";
import Grow from "@mui/material/Grow";
import {
  Check,
  EventOutlined,
  FastForward,
  Refresh,
} from "@mui/icons-material";

const createTodoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
  duedate: Yup.date().required("Due date is required"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["TODO", "IN_PROGRESS", "DONE"], "Invalid status"),
});

const CreateTodoPopup = ({
  isPopupOpen,
  onClose,
}: {
  isPopupOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const handleCreateTodo = (values: {
    title: string;
    description: string;
    duedate: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
  }) => {
    dispatch(createTodoThunk({ ...values, duedate: new Date(values.duedate) }))
      .unwrap()
      .then(() => {
        enqueueSnackbar("Todo added Successfully", { variant: "success" });
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
        aria-labelledby="create-todo-dialog"
        TransitionComponent={Grow}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          id="create-todo-dialog"
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Create a Todo
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: "",
              description: "",
              duedate: String(new Date()),
              status: "TODO",
            }}
            validationSchema={createTodoSchema}
            onSubmit={handleCreateTodo}
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
                    <ToggleButton value="IN_PROGRESS" aria-label="IN_PROGRESS">
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
                      Create
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

export default CreateTodoPopup;
