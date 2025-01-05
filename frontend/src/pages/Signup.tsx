import { Box, Typography, Container } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { signupThunk } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AppTextField from "../components/ui/AppTextField";
import SignupBgSvg from "../assets/login_bg.svg";

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
    <Box sx={{ display: "flex", justifyContent: "space-between", bgcolor: theme => theme.palette.background.default }}>
      <Container
        sx={{
          width: {
            md: "45%",
          },
          display: {
            md: "flex",
          },
          height: "100vh",
          alignItems: {
            md: "center",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            align="left"
            sx={{ fontWeight: "bold", fontSize: 45 }}
          >
            Welcome
          </Typography>
          <Typography
            component="h2"
            variant="h6"
            align="left"
            sx={{ color: "secondary.contrastText", fontWeight: "thin" }}
          >
            Organize your tasks and projects. Get things done.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", mt: 4, gap: 2 }}>
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
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Link to="/login">Log in</Link>
                  </Typography>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
      <Container
        sx={{
          width: "45%",
          display: { xs: "none", md: "flex" },
          alignItems: {
            md: "center",
          },
          height: "100vh",
        }}
      >
        <img src={SignupBgSvg} alt="Login" />
      </Container>
    </Box>
  );
};

export default Signup;
