/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useEffect } from "react";
import { meThunk } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(meThunk());
  }, []);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider maxSnack={3}>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </LocalizationProvider>
    </>
  );
};

export default App;
