import { Box, Paper, Typography, Container } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { signupThunk } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AppTextField from "../components/ui/AppTextField";

const Signup = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignup = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log(values);
    dispatch(signupThunk(values))
      .unwrap()
      .then(() => {
        enqueueSnackbar("Successfully signed up", { variant: "success" });
        navigate("/dashboard");
      })
      .catch((error) => {
        enqueueSnackbar(error || "Something went wrong", { variant: "error" });
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z ]+$/, "Name must contain only letters and spaces")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography component="h1" variant="h5" align="center">
            Signup
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={validationSchema}
              validateOnChange={true}
              onSubmit={handleSignup}
            >
              <Form>
                <AppTextField name="name" label="Name" required />
                <AppTextField name="email" label="Email" required />
                <AppTextField
                  name="password"
                  label="Password"
                  type="password"
                  required
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={auth.loading}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Signup
                </LoadingButton>
              </Form>
            </Formik>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
