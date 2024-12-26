import { createTheme } from "@mui/material";

const todoLightTheme = createTheme({
  palette: {
    mode: "light", // Can toggle to 'dark' for dark mode
    primary: {
      main: "#4CAF50", // Emerald Green for main buttons/actions
      contrastText: "#FFFFFF", // White for text on primary
    },
    secondary: {
      main: "#FFC107", // Amber for secondary actions
      contrastText: "#212121", // Charcoal for secondary text
    },
    background: {
      default: "#F7F8FA", // Light gray for background
      paper: "#FFFFFF", // White for cards/containers
    },
    text: {
      primary: "#212121", // Main text color
      secondary: "#757575", // Subtext or placeholders
    },
    error: {
      main: "#FF5252", // Coral Red for error states
    },
    success: {
      main: "#8BC34A",
    },
    divider: "#E0E0E0", // Soft gray for dividers
    grey: {
      "400": "#FFFFFF", // Light gray for background
    },
    action: {
      hover: "#F0F0F0", // Light gray for hover
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
          borderRadius: "4px", // Rounded buttons
          textTransform: "none", // Disable uppercase text
        },
        containedPrimary: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#388E3C", // Slightly darker green
          },
        },
        containedSecondary: {
          backgroundColor: "#FFC107",
          color: "#212121",
          "&:hover": {
            backgroundColor: "#FFA000", // Slightly darker amber
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Rounded corners for cards
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
        },
      },
    },
  },
});

const todoDarkTheme = createTheme({
  palette: {
    mode: "dark", // Indicates dark mode
    primary: {
      main: "#4CAF50", // Emerald Green for main buttons/actions
      contrastText: "#FFFFFF", // White for text on primary
    },
    secondary: {
      main: "#FFC107", // Amber for secondary actions
      contrastText: "#B0B0B0", // Charcoal for secondary text
    },
    background: {
      default: "#121212", // Dark gray for background
      paper: "#1E1E1E", // Slightly lighter gray for cards/containers
    },
    text: {
      primary: "#FFFFFF", // White for main text
      secondary: "#B0B0B0", // Light gray for subtext or placeholders
    },
    error: {
      main: "#FF5252", // Coral Red for error states
    },
    success: {
      main: "#8BC34A", // Light Green for success
    },
    divider: "#333333", // Dark gray for dividers
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
          borderRadius: "4px", // Rounded buttons
          textTransform: "none", // Disable uppercase text
        },
        containedPrimary: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#388E3C", // Slightly darker green
          },
        },
        containedSecondary: {
          backgroundColor: "#FFC107",
          color: "#212121",
          "&:hover": {
            backgroundColor: "#FFA000", // Slightly darker amber
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Rounded corners for cards
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)", // Stronger shadow
        },
      },
    },
  },
});

export const appDrawerWidth = 280;
export const appNavbarHeight = 64;

export default {
  light: todoLightTheme,
  dark: todoDarkTheme,
};
