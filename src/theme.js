import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#1E232E",
    },
    text: {
      primary: "#fff",
      secondary: "#b0b0b0",
    },
    background: {
      default: "#0f0f0f",
      paper: "#383838", 
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;