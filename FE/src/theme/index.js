import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = responsiveFontSizes(createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#428bca",
    },
    error: {
      main: "#e5343d",
    },
    warning: {
      main: "#ffb61e",
    },
    info: {
      main: "#62d0f1",
    },
    success: {
      main: "#558b2f",
    },
    text: {
      primary: "#a5a9ad",
      secondary: "#fff",
    },
  },
  typography: {
    // htmlFontSize: 10,
    fontFamily: "Times New Roman",
  },
  spacing: 2,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
}));

export default theme;
