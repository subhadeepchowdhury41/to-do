import { Box, Paper, Typography, Container } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { loginThunk } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AppTextField from "../components/ui/AppTextField";

const Login = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values);
    dispatch(loginThunk(values))
      .unwrap()
      .then(() => {
        enqueueSnackbar("Successfully logged in", { variant: "success" });
        navigate("/dashboard");
      })
      .catch((error) => {
        enqueueSnackbar(error || "Something went wrong", { variant: "error" });
      });
  };
  const validationSchema = Yup.object({
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
            Login
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              validateOnChange={true}
              onSubmit={handleLogin}
            >
              <Form>
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
                  Login
                </LoadingButton>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Typography variant="body2">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup">Sign up</Link>
                  </Typography>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
