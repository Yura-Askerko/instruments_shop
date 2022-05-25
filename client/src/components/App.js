import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material";
import "./App.css";
import MainRouter from "../router/MainRouter";
import { blue } from "@mui/material/colors";
import { checkAuth, fetchCurrentUser } from "../helpers/api/auth";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, isAuthenticatedState } from "../atoms/auth";
import basketsResource from "../helpers/api/baskets";
import { currentUserBasketState } from "../atoms/userBasket";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
  },
});

function App() {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setCurrentUserBasket = useSetRecoilState(currentUserBasketState);

  useEffect(async () => {
    console.log("dawdaw");
    const [isAuthenticated, currentUser] = await Promise.all([
      checkAuth(),
      fetchCurrentUser(),
    ]);
    if (isAuthenticated && !currentUser.isAdmin) {
      const userBasket = await basketsResource.getUserBasket();
      setCurrentUserBasket(userBasket);
    }
    setIsAuthenticated(isAuthenticated);
    setCurrentUser(currentUser);
  }, []);

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
