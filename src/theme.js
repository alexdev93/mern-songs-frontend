import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2", // Customize your primary color
    },
    secondary: {
      main: "#1E232E", // Customize your secondary color
    },
    text: {
      primary: "#fff", // Primary text color
      secondary: "#b0b0b0", // Secondary text color
    },
    background: {
      default: "#0f0f0f", // Background color for dark mode
      paper: "#383838", // Paper color for dark mode
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;