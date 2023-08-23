import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import App from "./App/App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const ThemeWrapper = () => {
  const [themeMode, setThemeMode] = React.useState("light");

  const lightTheme = {
    mode: "light",
    primary: {
      main: "#2bd977",
    },
    secondary: {
      main: "#04324d",
    },
    error: {
      main: "#e63946",
    },
    warning: {
      main: "#e9c46a",
    },
    info: {
      main: "#457b9d",
    },
    success: {
      main: "#52b788",
    },
  };

  const darkTheme = {
    mode: "dark",
    primary: {
      main: "#2a9d8f",
    },
    secondary: {
      main: "#04324d",
    },
    error: {
      main: "#e63946",
    },
    warning: {
      main: "#e9c46a",
    },
    info: {
      main: "#457b9d",
    },
    success: {
      main: "#52b788",
    },
  };

  const theme = createTheme({
    palette: themeMode === "light" ? lightTheme : darkTheme,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "50px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            margin: "20px",
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <ErrorBoundary>
            <App toggleTheme={toggleTheme} />
          </ErrorBoundary>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<ThemeWrapper />);
