/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import AppTextField from "../ui/AppTextField";
import { Button, MenuItem } from "@mui/material";
import AppDatePicker from "../ui/AppDatePicker";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import { createTodoThunk } from "../../features/todo/todoSlice";

const createTodoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
  duedate: Yup.date().required("Due date is required"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["TODO", "IN_PROGRESS", "DONE"], "Invalid status"),
});

export const CreateTodoForm = () => {
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
      })
      .catch((error: any) => {
        enqueueSnackbar(error || "Something went wrong", { variant: "error" });
      });
  };
  return (
    <>
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
        <Form>
          <AppTextField name="title" label="Title" type="text" required />
          <AppTextField
            name="description"
            label="Description"
            type="text"
            placeholder="Description"
            multiline
          />
          <AppDatePicker name="duedate" label="Due Date" />
          <AppTextField
            name="status"
            select
            label="Status"
            defaultValue={"TODO"}
          >
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
          </AppTextField>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Form>
      </Formik>
    </>
  );
};
