import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material";
import "./App.css";
import MainRouter from "../router/MainRouter";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Box className="App">
          <CssBaseline />
          <MainRouter />
        </Box>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
