import { createTheme } from "@mui/material";

const todoLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4CAF50",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFC107",
      contrastText: "#212121",
    },
    background: {
      default: "#F7F8FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    error: {
      main: "#FF5252",
    },
    success: {
      main: "#8BC34A",
    },
    divider: "#E0E0E0",
    grey: {
      "400": "#FFFFFF",
    },
    action: {
      hover: "#F0F0F0",
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#212121",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#212121",
    },
    body1: {
      fontSize: "1rem",
      color: "#212121",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#757575",
    },
    subtitle1: {
      fontSize: "0.8rem",
      fontWeight: 200,
      color: "#757575",
    },
    subtitle2: {
      fontSize: "0.8rem",
      fontWeight: 200,
      color: "#757575",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: 240,
          zIndex: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#388E3C",
          },
        },
        containedSecondary: {
          backgroundColor: "#FFC107",
          color: "#212121",
          "&:hover": {
            backgroundColor: "#FFA000",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

const todoDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4CAF50",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFC107",
      contrastText: "#B0B0B0",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    error: {
      main: "#FF5252",
    },
    success: {
      main: "#8BC34A",
    },
    divider: "#333333",
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#FFFFFF",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#FFFFFF",
    },
    body1: {
      fontSize: "1rem",
      color: "#FFFFFF",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#B0B0B0",
    },
    subtitle1: {
      fontSize: "0.8rem",
      fontWeight: 200,
      color: "#B0B0B0",
    },
    subtitle2: {
      fontSize: "0.8rem",
      fontWeight: 200,
      color: "#B0B0B0",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#388E3C",
          },
        },
        containedSecondary: {
          backgroundColor: "#FFC107",
          color: "#212121",
          "&:hover": {
            backgroundColor: "#FFA000",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
        },
      },
    },
  },
});

export const appDrawerWidth = 280;
export const appNavbarHeight = 64;

export const getStatusColor = (status: string) => {
  switch (status) {
    case "IN_PROGRESS":
      return "#FFC107";
    case "DONE":
      return "#4CAF50";
    default:
      return "gray";
  }
};

export default {
  light: todoLightTheme,
  dark: todoDarkTheme,
};
